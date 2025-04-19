"use server"

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

export async function generateSeoReportPdf(data: any) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()

    // Add a page to the document
    const page = pdfDoc.addPage([595.28, 841.89]) // A4 size

    // Get the standard font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Set text properties
    const fontSize = 12
    const lineHeight = 20

    // Add title
    page.drawText("SEO Report", {
      x: 50,
      y: 800,
      size: 24,
      font: boldFont,
      color: rgb(0, 0, 0),
    })

    // Add date
    page.drawText(`Generated on: ${data.lastUpdated || new Date().toLocaleDateString()}`, {
      x: 50,
      y: 770,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    })

    // Add overall score
    page.drawText(`Overall SEO Score: ${data.overallScore || 72}/100`, {
      x: 50,
      y: 740,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    })

    // Add description
    page.drawText(`Your website scores ${data.overallScore || 72}/100 - Good, but needs improvement`, {
      x: 50,
      y: 720,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    })

    // Add metrics section title
    page.drawText("Key Metrics:", {
      x: 50,
      y: 680,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    })

    // Add metrics
    const metrics = data.metrics || [
      { name: "Meta Tags", score: 85 },
      { name: "Heading Structure", score: 70 },
      { name: "URL Structure", score: 90 },
      { name: "Image Optimization", score: 65 },
      { name: "Mobile Friendliness", score: 80 },
      { name: "Page Speed", score: 60 },
      { name: "Content Quality", score: 75 },
    ]

    let yPos = 660
    metrics.forEach((metric: any) => {
      page.drawText(`${metric.name}: ${metric.score}%`, {
        x: 50,
        y: yPos,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      })
      yPos -= lineHeight
    })

    // Add critical issues section
    yPos -= 20
    page.drawText("Critical Issues:", {
      x: 50,
      y: yPos,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    })

    yPos -= lineHeight

    // Add critical issues
    const criticalIssues = data.criticalIssues || [
      {
        title: "Page Speed Issues",
        severity: "Critical",
        description: "Your page load time exceeds 3 seconds on mobile devices.",
      },
      {
        title: "Image Optimization",
        severity: "Critical",
        description: "12 images are missing alt tags and 8 images are oversized.",
      },
    ]

    criticalIssues.forEach((issue: any) => {
      page.drawText(`${issue.title} (${issue.severity})`, {
        x: 50,
        y: yPos,
        size: fontSize,
        font: boldFont,
        color: rgb(0.8, 0, 0),
      })

      yPos -= lineHeight

      // Split description into multiple lines if needed
      const words = issue.description.split(" ")
      let line = ""

      for (const word of words) {
        if ((line + word).length > 70) {
          page.drawText(line, {
            x: 50,
            y: yPos,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          })
          yPos -= lineHeight
          line = word + " "
        } else {
          line += word + " "
        }
      }

      if (line.trim().length > 0) {
        page.drawText(line, {
          x: 50,
          y: yPos,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        })
        yPos -= lineHeight
      }

      yPos -= 10
    })

    // Add footer
    page.drawText(
      "This report was automatically generated and provides an overview of your website's SEO performance.",
      {
        x: 50,
        y: 50,
        size: 10,
        font,
        color: rgb(0.5, 0.5, 0.5),
      },
    )

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save()

    // Convert to base64
    const base64 = Buffer.from(pdfBytes).toString("base64")

    return { success: true, base64 }
  } catch (error) {
    console.error("Error generating PDF:", error)
    return { success: false, error: "Failed to generate PDF report" }
  }
}
