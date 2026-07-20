"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import type { CVData } from "@/types/cv";
import ExportMenu from "@/components/ui/ExportMenu";
import { exportWord } from "@/lib/exportWord";

interface Props {
  data: CVData;
}

export default function CVPreview({ data }: Props) {
  const person = data.personal;

  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: `${person.fullName || "My CV"}`,
  });

  const handleWordExport = async () => {
    // generate .docx here
  };

  return (
    <>
      <div className="mb-5 flex justify-end items-start">
        <ExportMenu
          onPdf={handlePrint}
          onWord={() => exportWord(data)}
        />
      </div>

      {/* CV AREA */}
      <div
        ref={cvRef}
        className="cv-page relative mx-auto lg:sticky lg:top-8 min-h-[1123px] w-full max-w-[794px] rounded-xl border border-gray-200 bg-white p-10 shadow-2xl"
      >

        {/* Watermark */}
        <div id="cv-watermark" 
        className="absolute right-8 top-8 text-xs font-semibold uppercase tracking-widest text-gray-300">
          CVcraft
        </div>


        {/* Header */}
        <div className="border-b border-gray-300 pb-6">
          <h1 className="text-5xl font-extrabold tracking-wide text-slate-900">
            {person.fullName || "Your Name"}
          </h1>

          <p className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
            {person.title || "Software Engineer"}
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
          <section className="mt-8">
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
          <section className="mt-8">

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

          <section className="mt-8">

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

          <section className="mt-8">

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

        <section className="mt-8">

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

        <div className="no-print mt-12 border-t pt-5 text-center text-xs text-gray-400">
          Created with CVCraft
        </div>

      </div>
    </>
  );
}