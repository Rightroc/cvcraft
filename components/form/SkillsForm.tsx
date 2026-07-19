"use client";

interface Props {
  cvData: any;
  setCvData: React.Dispatch<React.SetStateAction<any>>;
}

export default function SkillsForm({
  cvData,
  setCvData,
}: Props) {
  const skills = cvData.skills;

  const handleChange = (
    index: number,
    value: string
  ) => {
    const updated = [...skills];
    updated[index] = value;

    setCvData((prev: any) => ({
      ...prev,
      skills: updated,
    }));
  };

  const addSkill = () => {
    setCvData((prev: any) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const removeSkill = (index: number) => {
    setCvData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">
        Skills
      </h2>

      {skills.map((skill: string, index: number) => (
        <div
          key={index}
          className="flex gap-3"
        >
          <input
            type="text"
            value={skill}
            placeholder="e.g React.js"
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
            className="flex-1 rounded-lg border p-3 outline-none focus:border-blue-600"
          />

          {skills.length > 1 && (
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="rounded-lg bg-red-500 px-4 text-white"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        + Add Skill
      </button>
    </div>
  );
}