import { Injectable } from '@angular/core';
import { COURSE_DATA } from '../constants';

export interface CourseRequirement {
  id: string;
  name: string;
  ds?: boolean;
}

export interface RequirementCategory {
  name: string;
  required: number;
  minimum_credit: number;
  categories: CourseRequirement[];
}

export interface Prerequisite {
  minimum: number;
  courses: {
    mandatory: string[];
    optional: string[];
  };
}

export interface Course {
  id: string;
  code: string;
  name: string;
  semester: string[];
  category: string[];
  prerequisite?: Prerequisite;
  creditHours?: number; // Default is 4, can be 3 or 4 for 400-level courses
  creditOptions?: number[]; // Array of available credit hour options (e.g., [3, 4])
}

export interface TrackRequirement {
  name: string;
  required: number;
  courseIds: string[];
  description?: string;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  requirements: TrackRequirement[];
}

export interface DataScienceTrackArea {
  name: string;
  required: number;
  courseIds: string[];
}

export interface DataScienceTrack extends Track {
  breadthAreas: DataScienceTrackArea[];
  advancedCourseIds: string[];
  recommendedElectiveIds: string[];
}

export interface CourseData {
  requirements: {
    total: {
      required: number;
      minimum_credit: number;
    };
    req: RequirementCategory[];
  };
  courses: Course[];
  tracks: Track[];
  dataScience: DataScienceTrack;
}

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private courseData: CourseData = COURSE_DATA;

  constructor() { }

  getCourseData(): CourseData {
    return this.courseData;
  }

  getCourse(id: string): Course | undefined {
    return this.courseData.courses.find(c => c.id === id);
  }

  getSemesterCourses(semester: string): Course[] {
    return this.courseData.courses.filter(c => c.semester.includes(semester));
  }

  getCategoryCourses(categoryId: string): Course[] {
    return this.courseData.courses.filter(c => c.category.includes(categoryId));
  }

  getTracks(): Track[] {
    return this.courseData.tracks;
  }

  getTrack(trackId: string): Track | undefined {
    return this.courseData.tracks.find(t => t.id === trackId);
  }

  getDataScienceTrack(): DataScienceTrack {
    return this.courseData.dataScience;
  }
}
