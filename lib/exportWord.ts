import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
} from "docx";

import { saveAs } from "file-saver";
import type { CVData } from "@/types/cv";

export async function exportWord(data: CVData) {
  const person = data.personal;

  const doc = new Document({
    sections: [
      {
        children: [

            new Paragraph({
                text: person.fullName || "Your Name",
                heading: HeadingLevel.TITLE,
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: person.title || "",
                        bold: true,
                }),
                ],
            }),

            new Paragraph(""),

            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                text: "Contact",
            }),

            new Paragraph(person.email || ""),
            new Paragraph(person.phone || ""),
            new Paragraph(person.address || ""),
            new Paragraph(person.linkedIn || ""),
            new Paragraph(person.portfolio || ""),
            new Paragraph(person.github || ""),

            new Paragraph(""),

            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                text: "Professional Summary",
            }),

            new Paragraph(data.summary || ""),

            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                text: "Professional Summary",
                }),

            new Paragraph(data.summary || ""),

            new Paragraph(""),

            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                text: "Education",
                }),

            ...data.education.flatMap((edu) => [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: edu.school,
                            bold: true,
                        }),
                    ],
                }),

                new Paragraph(
                    `${edu.degree}${edu.degree && edu.course ? " • " : ""}${edu.course}`
                ),

                new Paragraph(
                    `${edu.startYear} - ${edu.current ? "Present" : edu.endYear}`
                ),

                new Paragraph(""),
            ]),

            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                text: "Experience",
            }),

            ...data.experience.flatMap((exp) => [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: exp.position,
                            bold: true,
                        }),
                    ],
                }),

                new Paragraph(exp.company),

                new Paragraph(
                    `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`
                ),

                new Paragraph(exp.description || ""),

                new Paragraph(""),
            ]),

            new Paragraph(""),

            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                text: "Referees",
            }),

            ...data.referees.flatMap((ref) => [
                new Paragraph({
                    children: [
                    new TextRun({
                        text: ref.name,
                        bold: true,
                    }),
                    ],
                }),

                new Paragraph(ref.relationship),

                new Paragraph(ref.phone),

                new Paragraph(""),
            ]),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  saveAs(
    blob,
    `${person.fullName || "CV"}.docx`
  );
}