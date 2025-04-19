"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSeoReportPdf } from "@/app/actions/generate-pdf";
import { useToast } from "@/hooks/use-toast";

export function ExportPdfButton({ reportData }: { reportData: any }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsGenerating(true);

    try {
      const result = await generateSeoReportPdf(reportData);

      if (result.success && result.base64) {
        // Create a download link for the PDF
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${result.base64}`;
        link.download = `SEO_Report_${
          new Date().toISOString().split("T")[0]
        }.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          title: "Success",
          description: "SEO report PDF has been generated and downloaded.",
        });
      } else {
        throw new Error(result.error || "Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate the PDF report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={isGenerating} variant="outline">
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </>
      )}
    </Button>
  );
}
