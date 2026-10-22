import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { CATEGORY_LABELS, InstrumentCategory, InstrumentRow, formatChange, formatValue } from './instruments';

const NAVY: [number, number, number] = [11, 26, 46];
const ORANGE: [number, number, number] = [242, 140, 40];

const fmtDate = (d: string) => {
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : format(t, 'dd MMM yyyy');
};

export function exportMarketReportPdf(rows: InstrumentRow[], reportDate: string) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();

  // Cover band
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 38, 'F');
  doc.setFillColor(...ORANGE);
  doc.rect(0, 38, W, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Market Report', 14, 17);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Constant Capital (Ghana) Limited  |  Research', 14, 25);
  doc.text(`Data as at ${reportDate}   ·   Generated ${format(new Date(), 'dd MMM yyyy, HH:mm')}`, 14, 31);

  // Overview counts
  let y = 50;
  doc.setTextColor(...NAVY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Overview', 14, y);
  const cats = Object.keys(CATEGORY_LABELS) as InstrumentCategory[];
  autoTable(doc, {
    startY: y + 3,
    head: [['Market', 'Instruments', 'Latest data', 'Advancers', 'Decliners']],
    body: cats.map((c) => {
      const r = rows.filter((x) => x.category === c);
      const latest = r.reduce((m, x) => (x.date > m ? x.date : m), '');
      return [
        CATEGORY_LABELS[c],
        String(r.length),
        latest ? fmtDate(latest) : '—',
        String(r.filter((x) => (x.change ?? 0) > 0).length),
        String(r.filter((x) => (x.change ?? 0) < 0).length),
      ];
    }),
    theme: 'grid',
    headStyles: { fillColor: NAVY, textColor: 255 },
    styles: { fontSize: 9 },
    margin: { left: 14, right: 14 },
  });

  // One section per market
  cats.forEach((c) => {
    const r = rows.filter((x) => x.category === c);
    if (!r.length) return;
    // @ts-expect-error lastAutoTable is added by the plugin
    y = doc.lastAutoTable.finalY + 12;
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setTextColor(...NAVY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(CATEGORY_LABELS[c], 14, y);
    autoTable(doc, {
      startY: y + 3,
      head: [['Symbol', 'Instrument', c === 'equities' ? 'Sector' : 'Type', 'Value', 'Change', 'As at']],
      body: r.map((x) => [x.symbol, x.name, x.detail, formatValue(x), formatChange(x.change), fmtDate(x.date)]),
      theme: 'striped',
      headStyles: { fillColor: NAVY, textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      styles: { fontSize: 8.5, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: 'bold' }, 3: { halign: 'right' }, 4: { halign: 'right' } },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 4) {
          const v = r[data.row.index]?.change;
          if (v != null && v > 0) data.cell.styles.textColor = [22, 128, 61];
          if (v != null && v < 0) data.cell.styles.textColor = [200, 30, 30];
        }
      },
      margin: { left: 14, right: 14, top: 20 },
    });
  });

  // Footer on every page
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    const H = doc.internal.pageSize.getHeight();
    doc.setDrawColor(220);
    doc.line(14, H - 14, W - 14, H - 14);
    doc.setFontSize(7.5);
    doc.setTextColor(120);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Sources: Ghana Stock Exchange, Bank of Ghana, ExchangeRate-API and analyst entries. For information only; not investment advice.',
      14, H - 9,
    );
    doc.text(`Page ${i} of ${pages}`, W - 14, H - 9, { align: 'right' });
  }

  doc.save(`Constant-Capital-Market-Report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}

export function exportMarketReportCsv(rows: InstrumentRow[]) {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const lines = [
    ['Market', 'Symbol', 'Instrument', 'Type/Sector', 'Value', 'Unit', 'Change %', 'As at'].join(','),
    ...rows.map((r) =>
      [CATEGORY_LABELS[r.category], r.symbol, r.name, r.detail, r.value, r.unit, r.change ?? '', r.date]
        .map((v) => esc(String(v)))
        .join(','),
    ),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Constant-Capital-Market-Data-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
