"use client";

import { useState, useRef } from "react";
import ProgressBar from "@/components/form/ProgressBar";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import EducationForm from "@/components/form/EducationForm";
import CVPreview from "@/components/cv/CVPreview";
import { formSteps } from "@/data/formSteps";
import { defaultCV } from "@/data/defaultCV";
import SummaryForm from "@/components/form/SummaryForm";
import ExperienceForm from "@/components/form/ExperienceForm";
import SkillsForm from "@/components/form/SkillsForm";
import RefereeForm from "@/components/form/RefereeForm";


const previewRef = useRef<HTMLDivElement>(null);
const finish = () => {
  previewRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cvData, setCvData] = useState(defaultCV);

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={formSteps.length}
          />
          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            {formSteps[currentStep]}
          </h2>

          <div className="mt-8">

            {currentStep === 0 && (
              <PersonalInfoForm
                cvData={cvData}
                setCvData={setCvData}
              />
            )}

            {currentStep === 1 && (
              <SummaryForm
                cvData={cvData}
                setCvData={setCvData}
              />
            )}

            {currentStep === 2 && (
              <EducationForm
                cvData={cvData}
                setCvData={setCvData}
              />
            )}

            {currentStep === 3 && (
              <ExperienceForm
                cvData={cvData}
                setCvData={setCvData}
              />
            )}

            {currentStep === 4 && (
              <SkillsForm
                cvData={cvData}
                setCvData={setCvData}
              />
            )}

            {currentStep === 5 && (
              <RefereeForm
                cvData={cvData}
                setCvData={setCvData}
              />
            )}

          </div>

          <div className="mt-10 flex items-center justify-between">

            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Previous
            </button>

            <button
              onClick={
                currentStep === formSteps.length - 1
                  ? finish
                  : nextStep
              }
              className={`rounded-lg px-5 py-2 font-medium transition ${
                currentStep === formSteps.length - 1
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {currentStep === formSteps.length - 1
                ? "✓ Finish"
                : "Next →"}
            </button>

          </div>
        </div>

        <div ref={previewRef}>
          <CVPreview data={cvData} />
        </div>

      </div>
    </main>
  );
}