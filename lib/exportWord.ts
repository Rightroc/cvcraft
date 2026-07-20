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
          // =========================
          // HEADER
          // =========================

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

          // =========================
          // CONTACT
          // =========================

          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            text: "Contact",
          }),

          ...(person.email
            ? [new Paragraph(`Email: ${person.email}`)]
            : []),

          ...(person.phone
            ? [new Paragraph(`Phone: ${person.phone}`)]
            : []),

          ...(person.address
            ? [new Paragraph(`Address: ${person.address}`)]
            : []),

          ...(person.linkedIn
            ? [new Paragraph(`LinkedIn: ${person.linkedIn}`)]
            : []),

          ...(person.portfolio
            ? [new Paragraph(`Portfolio: ${person.portfolio}`)]
            : []),

          ...(person.github
            ? [new Paragraph(`GitHub: ${person.github}`)]
            : []),

          // =========================
          // SUMMARY
          // =========================

          ...(data.summary
            ? [
                new Paragraph(""),

                new Paragraph({
                  heading: HeadingLevel.HEADING_1,
                  text: "Professional Summary",
                }),

                new Paragraph(data.summary),
              ]
            : []),

          // =========================
          // EDUCATION
          // =========================

          ...(data.education.some(
            (edu) => edu.school || edu.degree || edu.course
          )
            ? [
                new Paragraph(""),

                new Paragraph({
                  heading: HeadingLevel.HEADING_1,
                  text: "Education",
                }),

                ...data.education.flatMap((edu) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: edu.school || "",
                        bold: true,
                      }),
                    ],
                  }),

                  new Paragraph(
                    `${edu.degree || ""}${
                      edu.degree && edu.course ? " • " : ""
                    }${edu.course || ""}`
                  ),

                  new Paragraph(
                    `${edu.startYear || ""}${
                      edu.startYear &&
                      (edu.endYear || edu.current)
                        ? " - "
                        : ""
                    }${edu.current ? "Present" : edu.endYear || ""}`
                  ),

                  new Paragraph(""),
                ]),
              ]
            : []),

          // =========================
          // EXPERIENCE
          // =========================

          ...(data.experience.some(
            (exp) => exp.company || exp.position
          )
            ? [
                new Paragraph({
                  heading: HeadingLevel.HEADING_1,
                  text: "Experience",
                }),

                ...data.experience.flatMap((exp) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: exp.position || "",
                        bold: true,
                      }),
                    ],
                  }),

                  new Paragraph(exp.company || ""),

                  new Paragraph(
                    `${exp.startDate || ""}${
                      exp.startDate &&
                      (exp.endDate || exp.current)
                        ? " - "
                        : ""
                    }${exp.current ? "Present" : exp.endDate || ""}`
                  ),

                  ...(exp.description
                    ? [new Paragraph(exp.description)]
                    : []),

                  new Paragraph(""),
                ]),
              ]
            : []),

          // =========================
          // SKILLS
          // =========================

          ...(data.skills.filter(Boolean).length
            ? [
                new Paragraph({
                  heading: HeadingLevel.HEADING_1,
                  text: "Skills",
                }),

                new Paragraph(
                  data.skills
                    .filter((skill) => skill.trim() !== "")
                    .join(", ")
                ),

                new Paragraph(""),
              ]
            : []),

          // =========================
          // REFEREES
          // =========================

          ...(data.referees.some(
            (ref) =>
              ref.name ||
              ref.phone ||
              ref.relationship
          )
            ? [
                new Paragraph({
                  heading: HeadingLevel.HEADING_1,
                  text: "Referees",
                }),

                ...data.referees.flatMap((ref) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: ref.name || "",
                        bold: true,
                      }),
                    ],
                  }),

                  ...(ref.relationship
                    ? [new Paragraph(ref.relationship)]
                    : []),

                  ...(ref.phone
                    ? [new Paragraph(ref.phone)]
                    : []),

                  new Paragraph(""),
                ]),
              ]
            : []),
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