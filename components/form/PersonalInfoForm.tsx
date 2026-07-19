"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";

const schema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone number is too short"),
  linkedIn: z.string().optional(),
  portfolio: z.string().optional(),
  github: z.string().optional(),
  address: z.string().min(3, "Address is required"),
  title: z.string().min(2, "Professional title is required"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  cvData: any;
  setCvData: React.Dispatch<React.SetStateAction<any>>;
}

export default function PersonalInfoForm({
  cvData,
  setCvData,
}: Props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: cvData.personal,
  });

  const values = watch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCvData((prev: any) => ({
        ...prev,
        personal: values,
      }));
    }, 0);

    return () => clearTimeout(timeout);
  }, [values, setCvData]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-900">
        Personal Information
      </h2>

      <Input
        label="Full Name"
        register={register("fullName")}
        error={errors.fullName?.message}
      />

      <Input
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Phone"
        register={register("phone")}
        error={errors.phone?.message}
      />

      <Input
        label="LinkedIn Profile"
        register={register("linkedIn")}
      />

      <Input
        label="Portfolio"
        register={register("portfolio")}
      />

      <Input
        label="GitHub"
        register={register("github")}
      />

      <Input
        label="Address"
        register={register("address")}
        error={errors.address?.message}
      />

      <Input
        label="Professional Title"
        register={register("title")}
        error={errors.title?.message}
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Next →
      </button>
    </form>
  );
}