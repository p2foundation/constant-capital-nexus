import { createClient } from "npm:@supabase/supabase-js@2";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  getLovableAiGatewayResponseHeaders,
} from "./run-id.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  // Only research staff (Admin / Developer / Analyst) may generate summaries
  const authHeader = req.headers.get("Authorization") ?? "";
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: canEdit, error: roleErr } = await supabase.rpc("can_edit_content");
  if (roleErr || !canEdit) return json(403, { error: "Only research staff can generate summaries." });

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json(500, { error: "AI is not configured." });

  let body: { title?: string; type?: string; content?: string; mode?: string; images?: unknown };
  try { body = await req.json(); } catch { return json(400, { error: "Invalid request." }); }
  const content = (body.content ?? "").trim();
  const images = Array.isArray(body.images)
    ? body.images.filter((i): i is string => typeof i === "string" && i.startsWith("data:image/") && i.length < 8_000_000).slice(0, 4)
    : [];
  if (body.mode === "scan") {
    if (!images.length && content.length < 100) return json(400, { error: "The document has no readable content to scan." });
  } else if (content.length < 100) return json(400, { error: "Add at least a paragraph of report content first." });

  const titlePrompt = `You are a research editor at Constant Capital, a Ghanaian investment bank.
Suggest ONE clear, specific headline (max 14 words) for this research report. Plain text, no quotes, no trailing period. Do not invent numbers.

Type: ${body.type ?? ""}
Report:
${content.slice(0, 20000)}`;

  const summaryPrompt = `You are an equity research editor at Constant Capital, a Ghanaian investment bank.
Write a reader-facing preview for this research report.
Format exactly:
- One opening sentence (max 35 words) stating the core view.
- Then "Key points:" followed by 3-5 short bullet points starting with "• ".
Plain text only, no markdown headings, under 120 words total. Do not invent numbers not in the report.

Title: ${body.title ?? ""}
Type: ${body.type ?? ""}
Report:
${content.slice(0, 40000)}`;

  const scanPrompt = `You are a research editor at Constant Capital, a Ghanaian investment bank. Scan this research document${images.length ? " (page images attached)" : ""} and write a clear public-facing summary that helps ordinary investors quickly understand it.
Format exactly (plain text, no markdown headings):
- One opening sentence (max 35 words) with the core view.
- "Key details:" then 4-7 bullets starting with "• " covering the most important figures, dates, prices, yields, recommendations or targets found in the document.
- "What it means for investors:" one short sentence.
Use only facts in the document; never invent numbers. Under 170 words.${images.length ? `
After the summary, output a line containing exactly ===FULL TEXT=== and then transcribe the readable text of the pages faithfully.` : ""}

Title: ${body.title ?? ""}
Type: ${body.type ?? ""}
${content ? `Document text:\n${content.slice(0, 40000)}` : ""}`;

  const input = body.mode === "scan"
    ? (images.length
      ? [{ role: "user", content: [{ type: "input_text", text: scanPrompt }, ...images.map((u) => ({ type: "input_image", image_url: u }))] }]
      : scanPrompt)
    : body.mode === "title" ? titlePrompt : summaryPrompt;

  const gateway = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
  try {
    const upstream = await gateway.fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      signal: req.signal,
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        input,
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        include: ["reasoning.encrypted_content"],
      }),
    });
    if (!upstream.ok) {
      const text = await upstream.text();
      let message = "AI request failed.";
      try { message = JSON.parse(text)?.error?.message ?? JSON.parse(text)?.message ?? message; } catch { /* ignore */ }
      return json(upstream.status, { error: message });
    }
    const headers = getLovableAiGatewayResponseHeaders(upstream.headers, cors);
    headers.set("Content-Type", "text/event-stream");
    return new Response(upstream.body, { status: 200, headers });
  } catch (e) {
    if (req.signal.aborted) return new Response(null, { status: 499, headers: cors });
    return json(500, { error: e instanceof Error ? e.message : "Unknown error" });
  }
});
