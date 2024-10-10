import { Timestamp } from '@angular/fire/firestore';

export const mcsdsCategories = ['Cloud Computing', 'Data Mining', 'Data Visualization', 'MCSDS Advanced', 'MCSDS Elective', 'Machine Learning']

export const mcsCategories = ['Artificial Intelligence', 'Database and Information Systems', 'Graphics/HCI', 'MCS Advanced', 'MCS Elective', 'Parallel Computing', 'Programming Languages & Software Engineering', 'Scientific Computing', 'Security and Privacy', 'Systems and Networking']

export const courseCategories = Array.from(
  new Set<string>(mcsCategories.concat(mcsdsCategories)))

export const courseLanguages = ["C", "C++", "JavaScript", "Kotlin", "GoLang",
  "MATLAB", "Python", "R", "Rust", "No Code"
] as const

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

export interface Difficulty {
  value: number;
  view: string;
}

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
  ClassName: string,
  CourseNumber: string,
  Description: string,
  DifficultyAvg: number,
  DifficultyCount: number,
  GraphicUrl: string,
  RatingAvg: number,
  RatingCount: number,
  SampleSyllabus: string,
  WorkloadAvg: number,
  WorkloadCount: number,
  category: string[] | null,
  languages: string[] | null,
  lastUpdated: Timestamp,
  season: {
    spring: boolean,
    summer: boolean,
    fall: boolean
  },
  season_str: string[]
}

export function getRouterLink(course: ClassData): string {
  var ret = `/courses/${course.CourseNumber}-${course.ClassName}`
  ret = ret.replace(/ /g, '-')
  return ret
}