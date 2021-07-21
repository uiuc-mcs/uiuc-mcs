import { Timestamp } from "@firebase/firestore-types";

export const courseCategories = [
  "Advanced", "Elective", "Machine Learning", "Data Mining",
  "Data Visualization", "Cloud Computing", "Artificial Intelligence",
  "Database and Information Systems", "Graphics/HCI", "Parallel Computing",
  "Programming Languages & Software Engineering", "Scientific Computing",
  "Systems and Networking"
] as const

export const courseLanguages = ["C", "C++", "Kotlin", "GoLang", "MATLAB",
  "Python", "R", "Rust", "No Code"
] as const

export interface ClassData {
  courseId: string,
  BookUsefulnessAvg: number,
  BookUsefulnessCount: number,
  ClassName: string,
  CourseNumber: string,
  DifficultyAvg: number,
  DifficultyCount: number,
  GraphicThumbnail: string,
  GraphicColor: string,
  GraphicUrl: string,
  LectureQualityAvg: number,
  LectureQualityCount: number,
  PiazzaCommunityAvg: number,
  PiazzaCommunityCount: number,
  ProfessorQualityAvg: number,
  ProfessorQualityCount: number,
  RatingAvg: number,
  RatingCount: number,
  SlackChannel?: string,
  SlackChannelLink?: string,
  Teacher: string,
  Textbook: boolean,
  TextbookName: string,
  WorkloadAvg: number,
  WorkloadCount: number,
  // category: string,
  category: string[] | null,

  // computerScience: {
  //   isComputerScience: boolean,
  //   category?: string,
  // },
  // dataScience: {
  //   isDataScience: boolean,
  //   category?: string,
  // },
  languages: string[] | null,
  lastUpdated: Timestamp,
  meta: {
    exams: boolean,
    homework: boolean,
    "peer reviewed": boolean,
    projects: boolean,
    proofs: boolean,
  },
  season: {
    spring: boolean,
    summer: boolean,
    fall: boolean
  },
  semesters: { [key: string]: number },
}
