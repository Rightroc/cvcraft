"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  data: any;
}

export default function CVPreview({ data }: Props) {
  const person = data.personal;

  const cvRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    if (!cvRef.current) return;

    setIsGenerating(true);

    const canvas = await html2canvas(cvRef.current, {
      scale: 2,
      onclone: (document) => {
        const elements = document.querySelectorAll("*");

        elements.forEach((element) => {
          const htmlElement = element as HTMLElement;

          const style = window.getComputedStyle(htmlElement);

          if (style.color.includes("lab")) {
            htmlElement.style.color = "#111827";
          }

          if (style.backgroundColor.includes("lab")) {
            htmlElement.style.backgroundColor = "#ffffff";
          }

          if (style.borderColor.includes("lab")) {
            htmlElement.style.borderColor = "#d1d5db";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `${person.fullName || "my-cv"}.pdf`
    );
    setIsGenerating(false);
  };

  return (
    <>
      {/* Download Button */}
      <div className="mb-5 flex justify-end">
        <button
          onClick={downloadPDF}
          disabled={isGenerating}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGenerating
            ? "Generating PDF..."
            : "Download CV PDF"}
        </button>
      </div>


      {/* CV AREA */}
      <div
        ref={cvRef}
        className="relative sticky top-8 mx-auto min-h-[1123px] w-full max-w-[794px] rounded-xl border border-gray-200 bg-white p-10 shadow-2xl"
      >

        {/* Watermark */}
        <div id="cv-watermark" 
        className="absolute right-8 top-8 text-xs font-semibold uppercase tracking-widest text-gray-300">
          CV Builder
        </div>


        {/* Header */}
        <div className="border-b border-gray-300 pb-6">
          <h1 className="text-5xl font-extrabold tracking-wide text-slate-900">
            {person.fullName || "Your Name"}
          </h1>

          <p className="mt-3 text-lg font-medium uppercase tracking-[0.2em] text-blue-600">
            {person.title || "Professional Title"}
          </p>


          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-700">
            {person.email && <p>📧 {person.email}</p>}
            {person.phone && <p>📞 {person.phone}</p>}
            {person.address && <p>📍 {person.address}</p>}
            {person.linkedIn && <p>🔗 {person.linkedIn}</p>}
            {person.portfolio && <p>🌐 {person.portfolio}</p>}
            {person.github && <p>💻 {person.github}</p>}
          </div>
        </div>


        {/* Summary */}
        {data.summary && (
          <section className="mt-10">
            <h2 className="border-b-2 border-blue-600 pb-2 text-xl font-bold uppercase tracking-widest text-slate-900">
              Professional Summary
            </h2>

            <p className="mt-4 whitespace-pre-line leading-8 text-gray-700">
              {data.summary}
            </p>
          </section>
        )}


        {/* Education */}
        {data.education?.some(
          (edu: any) =>
            edu.school ||
            edu.degree ||
            edu.course
        ) && (
          <section className="mt-10">

            <h2 className="border-b-2 border-blue-600 pb-2 text-xl font-bold uppercase tracking-widest text-slate-900">
              Education
            </h2>


            <div className="mt-6 space-y-7">

              {data.education.map(
                (edu: any, index: number) => (

                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-5"
                >

                  <h3 className="text-lg font-bold text-slate-900">
                    {edu.school}
                  </h3>


                  <p className="mt-1 text-gray-700">
                    {edu.degree}

                    {edu.degree &&
                      edu.course &&
                      " • "}

                    {edu.course}
                  </p>


                  <p className="mt-1 text-sm text-gray-500">
                    {edu.startYear}

                    {edu.startYear &&
                      (edu.endYear ||
                        edu.current) &&
                      " - "}

                    {edu.current
                      ? "Present"
                      : edu.endYear}
                  </p>

                </div>
              ))}
            </div>

          </section>
        )}


        {/* Experience */}
        {data.experience?.some(
          (exp: any) =>
            exp.company ||
            exp.position
        ) && (

          <section className="mt-10">

            <h2 className="border-b-2 border-blue-600 pb-2 text-xl font-bold uppercase tracking-widest text-slate-900">
              Experience
            </h2>


            <div className="mt-6 space-y-7">

              {data.experience.map(
                (exp: any,index:number)=>(
                  
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-5"
                >

                  <h3 className="text-lg font-bold text-slate-900">
                    {exp.position}
                  </h3>


                  <p className="text-base font-bold text-blue-700">
                    {exp.company}
                  </p>


                  <p className="mt-1 text-sm text-gray-500">
                    {exp.startDate}

                    {exp.startDate &&
                      (exp.endDate ||
                      exp.current) &&
                      " - "}

                    {exp.current
                      ? "Present"
                      : exp.endDate}
                  </p>


                  {exp.description && (

                    <p className="mt-3 whitespace-pre-line leading-8 text-gray-700">
                      {exp.description}
                    </p>

                  )}

                </div>
              ))}
            </div>

          </section>
        )}


        {/* Skills */}
        {data.skills?.some(
          (skill:string)=>skill.trim() !== ""
        ) && (

          <section className="mt-10">

            <h2 className="border-b-2 border-blue-600 pb-2 text-xl font-bold uppercase tracking-widest text-slate-900">
              Skills
            </h2>


            <div className="mt-6 flex flex-wrap gap-3">

              {data.skills
              .filter(
                (skill:string)=>
                  skill.trim() !== ""
              )
              .map(
                (skill:string,index:number)=>(

                <span
                  key={index}
                  className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
                >
                  {skill}
                </span>

              ))}

            </div>

          </section>

        )}


        {/* Referees */}
        {data.referees?.some(
          (ref:any)=>
            ref.name ||
            ref.phone ||
            ref.relationship
        ) && (

        <section className="mt-10">

          <h2 className="border-b-2 border-blue-600 pb-2 text-xl font-bold uppercase tracking-widest text-slate-900">
            Referees
          </h2>


          <div className="mt-6 space-y-5">

          {data.referees.map(
            (ref:any,index:number)=>(

            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm"
            >

              <h3 className="text-lg font-semibold text-slate-900">
                {ref.name}
              </h3>


              <p className="mt-1 text-gray-700">
                {ref.relationship}
              </p>


              <p className="text-gray-600">
                {ref.phone}
              </p>


            </div>

          ))}

          </div>


        </section>

        )}

      </div>
    </>
  );
}