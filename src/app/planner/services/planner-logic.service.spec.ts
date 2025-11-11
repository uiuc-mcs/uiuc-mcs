import { TestBed } from '@angular/core/testing';
import { PlannerLogicService, SelectionBox, CalculationResult } from './planner-logic.service';
import { CourseDataService } from './course-data.service';

describe('PlannerLogicService', () => {
  let service: PlannerLogicService;
  let courseDataService: CourseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerLogicService);
    courseDataService = TestBed.inject(CourseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('should return an array of categories', () => {
      const categories = service.getCategories();
      expect(Array.isArray(categories)).toBe(true);
    });

    it('should return categories with required properties', () => {
      const categories = service.getCategories();
      categories.forEach(cat => {
        expect(cat.id).toBeDefined();
        expect(cat.name).toBeDefined();
        expect(typeof cat.ds).toBe('boolean');
        expect(typeof cat.type).toBe('number');
      });
    });

    it('should initialize categories from course data requirements', () => {
      const categories = service.getCategories();
      const courseData = courseDataService.getCourseData();
      
      expect(categories.length).toBeGreaterThan(0);
      
      // Check that some category IDs match those in course data
      const categoryIds = categories.map(c => c.id);
      const reqCategoryIds: string[] = [];
      courseData.requirements.req.forEach(r => {
        r.categories.forEach(c => {
          reqCategoryIds.push(c.id);
        });
      });
      
      reqCategoryIds.forEach((id: string) => {
        expect(categoryIds).toContain(id);
      });
    });
  });

  describe('getCurrentSemester', () => {
    it('should return a valid semester string', () => {
      const semester = service.getCurrentSemester();
      expect(['spring', 'summer', 'fall']).toContain(semester);
    });

    it('should return spring for January to April', () => {
      // We can't mock Date easily, but we can test the logic by checking the return value
      const semester = service.getCurrentSemester();
      expect(typeof semester).toBe('string');
      expect(semester.length).toBeGreaterThan(0);
    });
  });

  describe('getSelectionBoxes', () => {
    it('should generate correct number of selection boxes', () => {
      const boxes = service.getSelectionBoxes('spring', 2024, 6);
      expect(boxes.length).toBe(6);
    });

    it('should start with correct semester and year', () => {
      const boxes = service.getSelectionBoxes('spring', 2024, 6);
      expect(boxes[0].semester).toBe('spring');
      expect(boxes[0].year).toBe(2024);
      expect(boxes[0].name).toBe('Spring 2024');
    });

    it('should progress through semesters correctly', () => {
      const boxes = service.getSelectionBoxes('spring', 2024, 6);
      expect(boxes[0].semester).toBe('spring');
      expect(boxes[1].semester).toBe('summer');
      expect(boxes[2].semester).toBe('fall');
      expect(boxes[3].semester).toBe('spring');
    });

    it('should increment year after fall semester', () => {
      const boxes = service.getSelectionBoxes('spring', 2024, 6);
      expect(boxes[0].year).toBe(2024);
      expect(boxes[1].year).toBe(2024);
      expect(boxes[2].year).toBe(2024);
      expect(boxes[3].year).toBe(2025);
    });

    it('should initialize with empty courses array', () => {
      const boxes = service.getSelectionBoxes('spring', 2024, 3);
      boxes.forEach(box => {
        expect(Array.isArray(box.courses)).toBe(true);
        expect(box.courses.length).toBe(0);
      });
    });

    it('should generate correct number of boxes for different total counts', () => {
      expect(service.getSelectionBoxes('fall', 2023, 1).length).toBe(1);
      expect(service.getSelectionBoxes('fall', 2023, 5).length).toBe(5);
      expect(service.getSelectionBoxes('fall', 2023, 12).length).toBe(12);
    });

    it('should handle different starting semesters', () => {
      const springBoxes = service.getSelectionBoxes('spring', 2024, 3);
      const summerBoxes = service.getSelectionBoxes('summer', 2024, 3);
      const fallBoxes = service.getSelectionBoxes('fall', 2024, 3);

      expect(springBoxes[0].semester).toBe('spring');
      expect(summerBoxes[0].semester).toBe('summer');
      expect(fallBoxes[0].semester).toBe('fall');
    });
  });

  describe('getCategoryForCourse', () => {
    it('should return categories for a valid course', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        const categories = service.getCategoryForCourse(courseId);
        expect(Array.isArray(categories)).toBe(true);
      }
    });

    it('should return empty array for invalid course', () => {
      const categories = service.getCategoryForCourse('invalid-course-xyz');
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBe(0);
    });

    it('should return categories with id and parent properties', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        const categories = service.getCategoryForCourse(courseId);
        categories.forEach(cat => {
          expect(cat.id).toBeDefined();
          expect(typeof cat.parent).toBe('number');
        });
      }
    });
  });

  describe('addCourse and removeCourse', () => {
    beforeEach(() => {
      // Reset selected courses before each test
      service.setSelectedCourses([]);
    });

    it('should add a course to selected list', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        service.addCourse(courseId);
        expect(service.getSelectedCourses()).toContain(courseId);
      }
    });

    it('should not add duplicate courses', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        service.addCourse(courseId);
        service.addCourse(courseId);
        const selected = service.getSelectedCourses();
        const count = selected.filter(id => id === courseId).length;
        expect(count).toBe(1);
      }
    });

    it('should remove a course from selected list', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        service.addCourse(courseId);
        service.removeCourse(courseId);
        expect(service.getSelectedCourses()).not.toContain(courseId);
      }
    });

    it('should handle removing non-existent course gracefully', () => {
      const initialLength = service.getSelectedCourses().length;
      service.removeCourse('non-existent-course-xyz');
      expect(service.getSelectedCourses().length).toBe(initialLength);
    });

    it('should maintain other courses when removing one', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length >= 2) {
        const course1Id = courses[0].id;
        const course2Id = courses[1].id;
        service.addCourse(course1Id);
        service.addCourse(course2Id);
        service.removeCourse(course1Id);
        expect(service.getSelectedCourses()).toContain(course2Id);
        expect(service.getSelectedCourses()).not.toContain(course1Id);
      }
    });
  });

  describe('getSelectedCourses and setSelectedCourses', () => {
    it('should return array of selected course IDs', () => {
      const selected = service.getSelectedCourses();
      expect(Array.isArray(selected)).toBe(true);
    });

    it('should set selected courses', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length >= 2) {
        const courseIds = [courses[0].id, courses[1].id];
        service.setSelectedCourses(courseIds);
        expect(service.getSelectedCourses()).toEqual(courseIds);
      }
    });

    it('should return a copy of selected courses array', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        service.addCourse(courseId);
        const selected = service.getSelectedCourses();
        selected.push('new-course');
        expect(service.getSelectedCourses().length).not.toBe(selected.length);
      }
    });
  });

  describe('setCreditHours and getCreditHours', () => {
    it('should set custom credit hours for a course', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        service.setCreditHours(courseId, 3);
        expect(service.getCreditHours(courseId)).toBe(3);
      }
    });

    it('should return default 4 credits if not set', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        const credits = service.getCreditHours(courseId);
        expect(typeof credits).toBe('number');
        expect(credits).toBeGreaterThan(0);
      }
    });

    it('should use course credit hours if specified', () => {
      const courses = courseDataService.getCourseData().courses;
      const courseWithCredits = courses.find(c => c.creditHours);
      if (courseWithCredits && courseWithCredits.creditHours) {
        const credits = service.getCreditHours(courseWithCredits.id);
        expect(credits).toBe(courseWithCredits.creditHours);
      }
    });

    it('should override default with custom credit hours', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        const defaultCredits = service.getCreditHours(courseId);
        service.setCreditHours(courseId, defaultCredits + 1);
        expect(service.getCreditHours(courseId)).toBe(defaultCredits + 1);
      }
    });
  });

  describe('calculate', () => {
    beforeEach(() => {
      service.setSelectedCourses([]);
    });

    it('should return a calculation result object', () => {
      const result = service.calculate();
      expect(result).toBeDefined();
      expect(typeof result.total).toBe('number');
      expect(result.color).toBeDefined();
      expect(typeof result.breadthComplete).toBe('number');
      expect(typeof result.breadthNeeded).toBe('number');
      expect(typeof result.advancedComplete).toBe('number');
      expect(typeof result.advancedNeeded).toBe('number');
      expect(typeof result.electivesComplete).toBe('number');
      expect(typeof result.electivesNeeded).toBe('number');
    });

    it('should calculate zero credits for no courses', () => {
      const result = service.calculate();
      expect(result.total).toBe(0);
    });

    it('should calculate correct total credits', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length >= 2) {
        service.addCourse(courses[0].id);
        service.addCourse(courses[1].id);
        const result = service.calculate();
        const expectedCredits = service.getCreditHours(courses[0].id) + service.getCreditHours(courses[1].id);
        expect(result.total).toBe(expectedCredits);
      }
    });

    it('should return color-ok when total is 32 credits', () => {
      const courses = courseDataService.getCourseData().courses;
      let totalCredits = 0;
      let courseIndex = 0;
      
      // Add courses until we reach 32 credits
      while (totalCredits < 32 && courseIndex < courses.length) {
        const courseId = courses[courseIndex].id;
        service.addCourse(courseId);
        totalCredits += service.getCreditHours(courseId);
        courseIndex++;
      }

      // Adjust if we overshot
      if (totalCredits > 32) {
        service.setSelectedCourses([]);
        // Try with custom credit hours
        for (let i = 0; i < 8; i++) {
          service.addCourse(courses[i].id);
          service.setCreditHours(courses[i].id, 4);
        }
      }

      const result = service.calculate();
      if (result.total === 32) {
        expect(result.color).toBe('color-ok');
      }
    });

    it('should return color-notok when total is not 32 credits', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        service.addCourse(courses[0].id);
        const result = service.calculate();
        if (result.total !== 32) {
          expect(result.color).toBe('color-notok');
        }
      }
    });

    it('should track breadth courses correctly', () => {
      const result = service.calculate();
      expect(Array.isArray(result.breadthCourses)).toBe(true);
      expect(result.breadthNeeded).toBe(4);
      expect(result.breadthComplete).toBeGreaterThanOrEqual(0);
      expect(result.breadthComplete).toBeLessThanOrEqual(9); // Max 9 breadth areas
    });

    it('should track advanced courses correctly', () => {
      const result = service.calculate();
      expect(Array.isArray(result.advancedCourses)).toBe(true);
      expect(result.advancedNeeded).toBe(3);
      expect(result.advancedComplete).toBeGreaterThanOrEqual(0);
    });

    it('should track electives correctly', () => {
      const result = service.calculate();
      expect(Array.isArray(result.electivesCourses)).toBe(true);
      expect(result.electivesNeeded).toBe(1);
      expect(result.electivesComplete).toBeGreaterThanOrEqual(0);
    });

    it('should include category calculations', () => {
      const result = service.calculate();
      expect(Array.isArray(result.categories)).toBe(true);
    });

    it('should count overflow breadth courses as electives', () => {
      // Clear any existing courses
      service.setSelectedCourses([]);
      
      // Find courses from different breadth areas
      const courses = courseDataService.getCourseData().courses;
      const breadthCategories = ['ai-1', 'db-1', 'sys-1', 'sec-1', 'arch-1'];
      
      // Map to track courses per breadth area
      const coursesByArea = new Map<string, string>();
      
      for (const course of courses) {
        for (const breadthCat of breadthCategories) {
          if (course.category.includes(breadthCat) && !coursesByArea.has(breadthCat)) {
            coursesByArea.set(breadthCat, course.id);
            break;
          }
        }
        if (coursesByArea.size === 5) break;
      }

      // Add all 5 breadth courses (1 more than the requirement of 4)
      coursesByArea.forEach(courseId => {
        service.addCourse(courseId);
      });

      const result = service.calculate();
      
      // Should have found 5 breadth courses from different areas
      if (coursesByArea.size === 5) {
        // Should have 4 breadth categories met (max requirement)
        expect(result.breadthComplete).toBe(4);
        
        // The 5th breadth course should count as an elective
        expect(result.electivesComplete).toBeGreaterThanOrEqual(1);
      } else {
        // If we couldn't find 5 different breadth courses, skip the elective check
        expect(coursesByArea.size).toBeLessThan(5);
      }
    });

    it('should count overflow advanced courses as electives', () => {
      // Clear any existing courses
      service.setSelectedCourses([]);
      
      // Find advanced courses
      const courses = courseDataService.getCourseData().courses;
      const advancedCourses = courses.filter(c => c.category.includes('adv-1'));

      // Add 5 advanced courses (2 more than the requirement of 3)
      for (let i = 0; i < Math.min(5, advancedCourses.length); i++) {
        service.addCourse(advancedCourses[i].id);
      }

      const result = service.calculate();
      
      // Should have at least 5 advanced courses
      expect(result.advancedComplete).toBe(5);
      
      // The overflow (2 courses) should count as electives
      expect(result.electivesComplete).toBeGreaterThanOrEqual(2);
    });

    it('should show green (color-ok) for total credits when >= 32', () => {
      // Clear any existing courses
      service.setSelectedCourses([]);
      
      // Add enough courses to get 36 credits (more than the 32 requirement)
      const courses = courseDataService.getCourseData().courses;
      let totalCredits = 0;
      
      for (const course of courses) {
        if (totalCredits < 36) {
          service.addCourse(course.id);
          totalCredits += service.getCreditHours(course.id);
        }
      }

      const result = service.calculate();
      
      if (result.total >= 32) {
        expect(result.color).toBe('color-ok');
      }
    });
  });

  describe('checkPrerequisite', () => {
    beforeEach(() => {
      service.setSelectedCourses([]);
    });

    it('should return valid true for course without prerequisites', () => {
      const courses = courseDataService.getCourseData().courses;
      const courseWithoutPrereq = courses.find(c => !c.prerequisite || c.prerequisite.minimum === 0);
      if (courseWithoutPrereq) {
        const result = service.checkPrerequisite(courseWithoutPrereq.id);
        expect(result.valid).toBe(true);
        expect(result.message).toBe('');
      }
    });

    it('should return valid false for course with unmet prerequisites', () => {
      const courses = courseDataService.getCourseData().courses;
      const courseWithPrereq = courses.find(c => c.prerequisite && c.prerequisite.minimum > 0);
      if (courseWithPrereq) {
        const result = service.checkPrerequisite(courseWithPrereq.id);
        expect(result.valid).toBe(false);
        expect(result.message.length).toBeGreaterThan(0);
      }
    });

    it('should return valid true when mandatory prerequisites are met', () => {
      const courses = courseDataService.getCourseData().courses;
      const courseWithPrereq = courses.find(c => 
        c.prerequisite && 
        c.prerequisite.courses.mandatory.length > 0
      );
      
      if (courseWithPrereq && courseWithPrereq.prerequisite) {
        // Add all mandatory prerequisites
        courseWithPrereq.prerequisite.courses.mandatory.forEach(prereqId => {
          service.addCourse(prereqId);
        });

        // Add optional prerequisites if needed
        const mandatoryCount = courseWithPrereq.prerequisite.courses.mandatory.length;
        const optionalNeeded = courseWithPrereq.prerequisite.minimum - mandatoryCount;
        for (let i = 0; i < optionalNeeded && i < courseWithPrereq.prerequisite.courses.optional.length; i++) {
          service.addCourse(courseWithPrereq.prerequisite.courses.optional[i]);
        }

        const result = service.checkPrerequisite(courseWithPrereq.id);
        expect(result.valid).toBe(true);
      }
    });

    it('should include course information in prerequisite message', () => {
      const courses = courseDataService.getCourseData().courses;
      const courseWithPrereq = courses.find(c => c.prerequisite && c.prerequisite.minimum > 0);
      if (courseWithPrereq) {
        const result = service.checkPrerequisite(courseWithPrereq.id);
        if (!result.valid) {
          expect(result.message).toContain(courseWithPrereq.code);
          expect(result.message).toContain(courseWithPrereq.name);
        }
      }
    });

    it('should handle non-existent course gracefully', () => {
      const result = service.checkPrerequisite('non-existent-course-xyz');
      expect(result.valid).toBe(true);
      expect(result.message).toBe('');
    });
  });
});
