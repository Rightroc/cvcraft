"use client";

import { useState } from "react";
import ProgressBar from "@/components/form/ProgressBar";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import { formSteps } from "@/data/formSteps";

export default function BuilderPage() {
  const [currentStep] = useState(1);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={formSteps.length}
        />

        <div className="mt-8">
          <PersonalInfoForm />
        </div>
      </div>
    </main>
  );
}