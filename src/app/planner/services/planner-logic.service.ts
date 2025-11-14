/**
 * Based on UIUC MCS Course Planner (https://github.com/uiucmcs/courseplanner)
 * Copyright (c) 2021 UIUC MCS Community
 * Licensed under the MIT License
 */

import { Injectable } from '@angular/core';
import { CourseDataService, Course, CourseRequirement } from './course-data.service';
import { CategoryId, Semester, DEFAULT_CREDITS } from '../constants/enums';

export interface CategoryCalculation {
  total: number;
  color: string;
}

export interface CalculationResult {
  total: number;
  color: string;
  breadthComplete: number;
  breadthNeeded: number;
  breadthCourses: string[]; // Course IDs that count toward breadth
  advancedComplete: number;
  advancedNeeded: number;
  advancedCourses: string[]; // Course IDs that count toward advanced
  electivesComplete: number;
  electivesNeeded: number;
  electivesCourses: string[]; // Course IDs that count toward electives
  overflowBreadthCourses?: string[]; // Breadth courses beyond 4 that count as electives
  overflowAdvancedCourses?: string[]; // Advanced courses beyond 3 that count as electives
  categories: CategoryCalculation[];
}

export interface SelectionBox {
  name: string;
  semester: string;
  year: number;
  courses: Course[];
}

export interface Category {
  id: string;
  name: string;
  ds: boolean;
  type: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlannerLogicService {
  private perCredit = 4;
  private categories: Category[] = [];
  private selected: string[] = [];
  private creditHourMap: Map<string, number> = new Map(); // Track credit hours for each course

  constructor(private courseDataService: CourseDataService) {
    this.initializeCategories();
  }

  private initializeCategories(): void {
    const data = this.courseDataService.getCourseData();
    for (let i = 0; i < data.requirements.req.length; i++) {
      const r = data.requirements.req[i];
      for (let j = 0; j < r.categories.length; j++) {
        const cat: Category = {
          id: r.categories[j].id,
          name: r.categories[j].name,
          ds: r.categories[j].ds || false,
          type: i
        };
        this.categories.push(cat);
      }
    }
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCurrentSemester(): string {
    const month = new Date().getMonth();
    if (month <= 3) {
      return Semester.SPRING;
    } else if (month <= 6) {
      return Semester.SUMMER;
    } else {
      return Semester.FALL;
    }
  }

  getSelectionBoxes(startSemester: string, startYear: number, totalBoxes: number): SelectionBox[] {
    const sems = [Semester.SPRING, Semester.SUMMER, Semester.FALL];
    let index = sems.indexOf(startSemester as Semester);
    let year = startYear;
    const boxes: SelectionBox[] = [];

    for (let i = 0; i < totalBoxes; i++, index++) {
      if (index !== 0 && index % 3 === 0) {
        year++;
      }
      const sem = sems[index % 3];
      const semName = sem.charAt(0).toUpperCase() + sem.slice(1);
      const l: SelectionBox = {
        name: `${semName} ${year}`,
        semester: sem,
        year: year,
        courses: []
      };
      boxes.push(l);
    }

    return boxes;
  }

  getCategoryForCourse(courseId: string): { id: string; parent: number }[] {
    const course = this.courseDataService.getCourse(courseId);
    const cats: { id: string; parent: number }[] = [];

    if (course) {
      for (let i = 0; i < this.categories.length; i++) {
        if (course.category.includes(this.categories[i].id)) {
          cats.push({
            id: this.categories[i].id,
            parent: this.categories[i].type
          });
        }
      }
    }

    return cats;
  }

  addCourse(courseId: string): void {
    if (!this.selected.includes(courseId)) {
      this.selected.push(courseId);
    }
  }

  removeCourse(courseId: string): void {
    const index = this.selected.indexOf(courseId);
    if (index > -1) {
      this.selected.splice(index, 1);
    }
  }

  getSelectedCourses(): string[] {
    return [...this.selected];
  }

  setSelectedCourses(courseIds: string[]): void {
    this.selected = [...courseIds];
  }

  setCreditHours(courseId: string, credits: number): void {
    this.creditHourMap.set(courseId, credits);
  }

  getCreditHours(courseId: string): number {
    const course = this.courseDataService.getCourse(courseId);
    if (!course) return 4;

    // If stored in map, use that value
    if (this.creditHourMap.has(courseId)) {
      return this.creditHourMap.get(courseId)!;
    }

    // Otherwise use course default or 4
    return course.creditHours || 4;
  }

  calculate(): CalculationResult {
    const data = this.courseDataService.getCourseData();
    const courses = data.courses;

    // Track breadth areas covered (one per area)
    const breadthAreas = new Set<string>();
    let advancedCount = 0;
    let electiveCount = 0;
    let totalCredits = 0;

    // Map breadth categories to their area IDs
    const breadthCategoryMap: { [key: string]: string } = {
      [CategoryId.ARCHITECTURE]: 'arch',
      [CategoryId.ARTIFICIAL_INTELLIGENCE]: 'ai',
      [CategoryId.DATABASE_AND_INFORMATION_SYSTEMS]: 'db',
      [CategoryId.INTERACTIVE_COMPUTING]: 'ic',
      [CategoryId.PROGRAMMING_LANGUAGES]: 'pl',
      [CategoryId.SCIENTIFIC_COMPUTING]: 'sci',
      [CategoryId.SECURITY_AND_PRIVACY]: 'sec',
      [CategoryId.SYSTEMS_AND_NETWORKING]: 'sys',
      [CategoryId.THEORY_AND_ALGORITHMS]: 'thy'
    };

    // Arrays to track which courses fulfill each requirement
    const breadthCourses: string[] = [];
    const advancedCourses: string[] = [];
    const electivesCourses: string[] = [];
    const overflowBreadthCourses: string[] = [];
    const overflowAdvancedCourses: string[] = [];

    // Track courses that fulfill multiple breadth areas
    const breadthCoursesMap: Map<string, string[]> = new Map();

    // First pass: count all courses and categorize them
    for (const courseId of this.selected) {
      const course = courses.find(c => c.id === courseId);
      if (!course) continue;

      totalCredits += this.getCreditHours(courseId);

      // Check if it's an advanced course
      if (course.category.includes(CategoryId.ADVANCED_COURSEWORK)) {
        advancedCount++;
        advancedCourses.push(courseId);
      }

      // Check for explicit electives
      if (course.category.includes(CategoryId.ELECTIVES)) {
        electiveCount++;
        electivesCourses.push(courseId);
      }

      // Check for breadth areas
      const courseBreadthAreas: string[] = [];
      for (const cat of course.category) {
        if (breadthCategoryMap[cat]) {
          courseBreadthAreas.push(breadthCategoryMap[cat]);
        }
      }

      if (courseBreadthAreas.length > 0) {
        breadthCoursesMap.set(courseId, courseBreadthAreas);
      }
    }

    // Assign breadth courses to areas, tracking overflow
    for (const [courseId, areas] of breadthCoursesMap.entries()) {
      let assignedToBreadth = false;
      for (const area of areas) {
        // Only assign to breadth if we haven't met the requirement yet
        if (!breadthAreas.has(area) && breadthAreas.size < 4) {
          breadthAreas.add(area);
          breadthCourses.push(courseId);
          assignedToBreadth = true;
          break;
        }
      }
      // If course wasn't assigned to breadth (overflow), count as elective
      // But only if it doesn't already count as explicit elective
      if (!assignedToBreadth) {
        const course = courses.find(c => c.id === courseId);
        if (course && !course.category.includes(CategoryId.ELECTIVES)) {
          electiveCount++;
          electivesCourses.push(courseId);
          overflowBreadthCourses.push(courseId);
        }
      }
    }

    // Calculate overflow for advanced courses
    if (advancedCount > 3) {
      const overflow = advancedCount - 3;
      // Add overflow count to electives, but don't duplicate courses already counted
      const overflowCourses = advancedCourses.slice(-overflow);
      for (const courseId of overflowCourses) {
        const course = courses.find(c => c.id === courseId);
        if (course && !course.category.includes(CategoryId.ELECTIVES)) {
          electiveCount++;
          if (!electivesCourses.includes(courseId)) {
            electivesCourses.push(courseId);
          }
          overflowAdvancedCourses.push(courseId);
        }
      }
    }

    const calc: CalculationResult = {
      total: totalCredits,
      color: totalCredits >= 32 ? 'color-ok' : 'color-notok',
      breadthComplete: breadthAreas.size,
      breadthNeeded: 4,
      breadthCourses: breadthCourses,
      advancedComplete: advancedCount,
      advancedNeeded: 3,
      advancedCourses: advancedCourses,
      electivesComplete: electiveCount,
      electivesNeeded: 1,
      electivesCourses: electivesCourses,
      overflowBreadthCourses: overflowBreadthCourses.length > 0 ? overflowBreadthCourses : undefined,
      overflowAdvancedCourses: overflowAdvancedCourses.length > 0 ? overflowAdvancedCourses : undefined,
      categories: []
    };

    return calc;
  }

  checkPrerequisite(courseId: string): { valid: boolean; message: string } {
    const course = this.courseDataService.getCourse(courseId);
    if (!course || !course.prerequisite || course.prerequisite.minimum <= 0) {
      return { valid: true, message: '' };
    }

    let mandatoryCount = 0;
    let optionalCount = 0;

    for (const selectedId of this.selected) {
      if (course.prerequisite.courses.mandatory.includes(selectedId)) {
        mandatoryCount++;
      } else if (course.prerequisite.courses.optional.includes(selectedId)) {
        optionalCount++;
      }
    }

    if (
      mandatoryCount < course.prerequisite.courses.mandatory.length ||
      mandatoryCount + optionalCount < course.prerequisite.minimum
    ) {
      let message = `${course.code} ${course.name} has prerequisite(s).`;

      if (course.prerequisite.courses.mandatory.length > 0) {
        message += ' Must complete: ';
        const names: string[] = [];
        for (const id of course.prerequisite.courses.mandatory) {
          const c = this.courseDataService.getCourse(id);
          if (c) names.push(`${c.code} ${c.name}`);
        }
        message += names.join(', ') + '.';
      }

      if (course.prerequisite.courses.mandatory.length < course.prerequisite.minimum) {
        message += ` Complete any ${course.prerequisite.minimum - course.prerequisite.courses.mandatory.length} from: `;
        const names: string[] = [];
        for (const id of course.prerequisite.courses.optional) {
          const c = this.courseDataService.getCourse(id);
          if (c) names.push(`${c.code} ${c.name}`);
        }
        message += names.join(', ') + '.';
      }

      return { valid: false, message };
    }

    return { valid: true, message: '' };
  }
}
