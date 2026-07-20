import type { CVData } from "@/types/cv";

export const defaultCV: CVData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    github: "",
    address: "",
    title: "",
  },

  summary: "",

  education: [
    {
      school: "",
      degree: "",
      course: "",
      startYear: "",
      endYear: "",
      current: false,
    },
  ],

  experience: [
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],

  skills: [""],

  referees: [
    {
      name: "",
      phone: "",
      relationship: "",
    },
  ],
};