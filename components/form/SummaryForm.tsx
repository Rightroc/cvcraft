"use client";

import { useEffect, useState } from "react";

interface Props {
  cvData: any;
  setCvData: React.Dispatch<React.SetStateAction<any>>;
}

export default function SummaryForm({
  cvData,
  setCvData,
}: Props) {
  const [summary, setSummary] = useState(cvData.summary || "");

  useEffect(() => {
    setCvData((prev: any) => ({
      ...prev,
      summary,
    }));
  }, [summary, setCvData]);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">
        Professional Summary
      </h2>

      <textarea
        rows={6}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write a short professional summary..."
        className="w-full rounded-lg border p-4 outline-none focus:border-blue-600"
      />
    </div>
  );
}