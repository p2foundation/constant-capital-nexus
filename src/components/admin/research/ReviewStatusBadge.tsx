import { Badge } from "@/components/ui/badge";

const MAP: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Draft", variant: "outline" },
  pending_review: { label: "Awaiting approval", variant: "secondary" },
  published: { label: "Published", variant: "default" },
  rejected: { label: "Changes requested", variant: "destructive" },
};

export default function ReviewStatusBadge({ status }: { status?: string }) {
  const s = MAP[status ?? "published"] ?? MAP.published;
  return <Badge variant={s.variant} className="whitespace-nowrap">{s.label}</Badge>;
}
