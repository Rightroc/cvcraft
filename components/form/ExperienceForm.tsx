"use client";

import Input from "@/components/ui/Input";

interface Props {
  cvData: any;
  setCvData: React.Dispatch<React.SetStateAction<any>>;
}

export default function ExperienceForm({
  cvData,
  setCvData,
}: Props) {
  const experience = cvData.experience;

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...experience];
    (updated[index] as any)[field] = value;

    setCvData((prev: any) => ({
      ...prev,
      experience: updated,
    }));
  };

  const handleCurrentChange = (
    index: number,
    checked: boolean
  ) => {
    const updated = [...experience];

    updated[index].current = checked;

    if (checked) {
      updated[index].endDate = "";
    }

    setCvData((prev: any) => ({
      ...prev,
      experience: updated,
    }));
  };

  const addExperience = () => {
    setCvData((prev: any) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setCvData((prev: any) => ({
      ...prev,
      experience: prev.experience.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">
        Experience
      </h2>

      {experience.map((item: any, index: number) => (
        <div
          key={index}
          className="space-y-4 rounded-xl border p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900">
            Experience {index + 1}
          </h3>

          <Input
            label="Company"
            value={item.company}
            onChange={(e) =>
              handleChange(index, "company", e.target.value)
            }
          />

          <Input
            label="Position"
            value={item.position}
            onChange={(e) =>
              handleChange(index, "position", e.target.value)
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              value={item.startDate}
              onChange={(e) =>
                handleChange(index, "startDate", e.target.value)
              }
            />

            <Input
              label="End Date"
              value={item.endDate}
              onChange={(e) =>
                handleChange(index, "endDate", e.target.value)
              }
              disabled={item.current}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.current}
              onChange={(e) =>
                handleCurrentChange(index, e.target.checked)
              }
            />

            <label className="text-slate-700">
                I currently work here
            </label>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Job Description
            </label>

            <textarea
              rows={4}
              value={item.description}
              onChange={(e) =>
                handleChange(
                  index,
                  "description",
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>

          {experience.length > 1 && (
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Remove Experience
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        + Add Experience
      </button>
    </div>
  );
}