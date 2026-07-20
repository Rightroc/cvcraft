export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedIn?: string;
  portfolio?: string;
  github?: string;
  address: string;
  title: string;
}

export interface Education {
  school: string;
  degree: string;
  course: string;
  startYear: string;
  endYear: string;
  current?: boolean;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string;
}

export interface Referee {
  name: string;
  phone: string;
  relationship: string;
}

export interface CVData {
  personal: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  referees: Referee[];
}