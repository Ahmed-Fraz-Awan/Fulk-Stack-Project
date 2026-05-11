"use client";

import * as React from "react";
import { Download, FileText, Sheet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { mockKpis, mockWeekly, mockSubjects } from "@/lib/mock-data";

export default function ReportsPage() {
  async function exportPDF() {
    try {
      const jsPDF = (await import("jspdf")).default;
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Student Digital Twin · Weekly Report", 14, 18);
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        25,
      );
      autoTable(doc, {
        startY: 32,
        head: [["Metric", "Value"]],
        body: Object.entries(mockKpis).map(([k, v]) => [k, String(v)]),
        styles: { fontSize: 10 },
      });
      autoTable(doc, {
        head: [["Day", "Productivity", "Focus", "Stress"]],
        body: mockWeekly.map((w) => [w.day, w.productivity, w.focus, w.stress]),
        styles: { fontSize: 10 },
      });
      autoTable(doc, {
        head: [["Subject", "Score"]],
        body: mockSubjects.map((s) => [s.subject, s.score]),
        styles: { fontSize: 10 },
      });
      doc.save("digital-twin-report.pdf");
      toast.success("PDF report downloaded");
    } catch (e) {
      toast.error("Failed to generate PDF");
    }
  }

  function exportCSV() {
    const rows = [
      ["day", "productivity", "focus", "stress"],
      ...mockWeekly.map((w) => [w.day, w.productivity, w.focus, w.stress]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weekly-trends.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Reports
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
          Export <span className="text-gradient">your data</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Generate PDFs for advisors or share CSVs with your team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-fuchsia-400" /> Weekly PDF
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Branded PDF with KPIs, weekly trends, and subject mastery.
            </p>
            <Badge variant="info">A4 · 2 pages · ~120 KB</Badge>
            <Button variant="gradient" onClick={exportPDF}>
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sheet className="h-4 w-4 text-cyan-400" /> CSV export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Raw weekly time‑series for spreadsheets and notebooks.
            </p>
            <Badge variant="success">UTF‑8 · 7 rows</Badge>
            <Button variant="glass" onClick={exportCSV}>
              <Download className="h-4 w-4" /> Download CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
