import doctorImage from "../assets/증명사진.jpeg";

interface Career {
  period: string;
  description: string;
}

export interface DoctorInfo {
  name: string;
  role: string;
  image: string;
  specialty: string[];
  careers: Career[];
  certifications: string[];
  education: string[];
}

export const doctorInfo: DoctorInfo[] = [
  {
    name: "박성근",
    role: "원장",
    image: doctorImage,
    specialty: ["척추 디스크 치료", "도수치료", "체외충격파", "신경차단술"],
    careers: [{ period: "현재", description: "바로척마취통증의학과 원장" }],
    certifications: [
      "대한마취통증의학회 정회원",
      "대한통증학회 정회원",
      "마취통증의학과 전문의",
    ],
    education: ["전남대학교 의과대학 졸업"],
  },
];
