import { Timestamp } from "@firebase/firestore-types";

export const mcsdsCategories = [
  "MCSDS Advanced", "MCSDS Elective", "Machine Learning", "Data Mining",
  "Data Visualization", "Cloud Computing"
]

export const mcsCategories = [
  "MCS Advanced", "MCS Elective", "Artificial Intelligence",
  "Database and Information Systems", "Graphics/HCI", "Parallel Computing",
  "Programming Languages & Software Engineering", "Scientific Computing",
  "Systems and Networking"
]

export const courseCategories = Array.from(
  new Set<string>(mcsCategories.concat(mcsdsCategories)))

export const courseLanguages = ["C", "C++", "JavaScript", "Kotlin", "GoLang",
  "MATLAB", "Python", "R", "Rust", "No Code"
] as const

export interface Difficulty {
  value: number;
  view: string;
}

const firstYear = 2014 // When was the first semester and year?
const currentYear = (new Date()).getFullYear()
export const Years: number[] = Array.from(
  { length: currentYear - firstYear + 1 },
  (_v, k) => k + firstYear)

export const Semesters: string[] = ["Spring", "Summer", "Fall"]

// MatriculateSemYear = ["2021 Fall", "2021 Summer", "2021 Spring", 
// "2020 Fall"...]
export const MatriculateSemYear: string[] = Years.map(String)
  .reduce((a, v): any =>
    [...a, ...Semesters.map(x => x + " " + v)],
    []).reverse();


export const Difficulties: Difficulty[] = [
  { value: 5, view: 'Very Hard' },
  { value: 4, view: 'Hard' },
  { value: 3, view: 'Medium' },
  { value: 2, view: 'Easy' },
  { value: 1, view: 'Very Easy' },
];

interface Rating {
  value: number;
  view: string;
}

export const Ratings: Rating[] = [
  { value: 5, view: 'Strongly Liked' },
  { value: 4, view: 'Liked' },
  { value: 3, view: 'Neutral' },
  { value: 2, view: 'Disliked' },
  { value: 1, view: 'Strongly Disliked' },
];

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
  SeasonSpringName: string,
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

export function getRouterLink(course: ClassData): string {
  var ret = `/courses/${course.CourseNumber}-${course.ClassName}`
  ret = ret.replace(/ /g, '-')
  return ret
}