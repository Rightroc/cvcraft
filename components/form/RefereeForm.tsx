"use client";

import Input from "@/components/ui/Input";

interface Props {
  cvData: any;
  setCvData: React.Dispatch<React.SetStateAction<any>>;
}

export default function RefereeForm({
  cvData,
  setCvData,
}: Props) {
  const referees = cvData.referees;

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...referees];
    (updated[index] as any)[field] = value;

    setCvData((prev: any) => ({
      ...prev,
      referees: updated,
    }));
  };

  const addReferee = () => {
    setCvData((prev: any) => ({
      ...prev,
      referees: [
        ...prev.referees,
        {
          name: "",
          phone: "",
          relationship: "",
        },
      ],
    }));
  };

  const removeReferee = (index: number) => {
    setCvData((prev: any) => ({
      ...prev,
      referees: prev.referees.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">
        Referees
      </h2>

      {referees.map((item: any, index: number) => (
        <div
          key={index}
          className="space-y-4 rounded-xl border p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold">
            Referee {index + 1}
          </h3>

          <Input
            label="Full Name"
            value={item.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
          />

          <Input
            label="Phone Number"
            value={item.phone}
            onChange={(e) =>
              handleChange(index, "phone", e.target.value)
            }
          />

          <Input
            label="Relationship"
            value={item.relationship}
            onChange={(e) =>
              handleChange(index, "relationship", e.target.value)
            }
          />

          {referees.length > 1 && (
            <button
              type="button"
              onClick={() => removeReferee(index)}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Remove Referee
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addReferee}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        + Add Referee
      </button>
    </div>
  );
}