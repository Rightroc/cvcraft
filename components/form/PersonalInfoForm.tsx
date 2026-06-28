"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";

const schema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone number is too short"),
  linkedIn: z.string().url("Enter a valid LinkedIn profile URL").optional(),
  "portfolio/Website": z.string().url("Enter a valid portfolio/website URL").optional,
  "github profile": z.string().url("Enter a valid GitHub profile URL").optional,
  address: z.string().min(3, "Address is required"),
  title: z.string().min(2, "Professional title is required"),
});

type FormData = z.infer<typeof schema>;

export default function PersonalInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Step 1 Completed 🎉");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold">
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
        type="url"
        placeholder="https://www.linkedin.com/in/yourprofile"
        register={register("linkedIn")}
        error={errors.linkedIn?.message}
      />

      <Input
        label="portfolio/Website"
        type="url"
        placeholder="https://www.portfolio/Website.com"
        register={register("portfolio/Website")}
        error={errors["portfolio/Website"]?.message}
      />

      <Input
        label="github profile"
        type="url"
        placeholder="https://www.github.com/yourprofile"
        register={register("github profile")}
        error={errors["github profile"]?.message}
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
        className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Next →
      </button>
    </form>
  );
}