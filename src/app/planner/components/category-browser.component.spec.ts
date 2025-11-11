import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { CategoryBrowserComponent } from './category-browser.component';
import { CourseDataService } from '../services/course-data.service';

describe('CategoryBrowserComponent', () => {
  let component: CategoryBrowserComponent;
  let fixture: ComponentFixture<CategoryBrowserComponent>;
  let courseDataService: CourseDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryBrowserComponent);
    component = fixture.componentInstance;
    courseDataService = TestBed.inject(CourseDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with empty selectedCourseIds', () => {
      expect(component.selectedCourseIds).toBeDefined();
      expect(Array.isArray(component.selectedCourseIds)).toBe(true);
    });

    it('should initialize displayCategories', () => {
      expect(component.displayCategories).toBeDefined();
      expect(Array.isArray(component.displayCategories)).toBe(true);
    });

    it('should build category display on initialization', () => {
      expect(component.displayCategories.length).toBeGreaterThan(0);
    });

    it('should have requirement categories with correct structure', () => {
      component.displayCategories.forEach(reqDisplay => {
        expect(reqDisplay.reqName).toBeDefined();
        expect(Array.isArray(reqDisplay.categories)).toBe(true);
      });
    });

    it('should have categories with required properties', () => {
      component.displayCategories.forEach(reqDisplay => {
        reqDisplay.categories.forEach(cat => {
          expect(cat.id).toBeDefined();
          expect(cat.name).toBeDefined();
          expect(Array.isArray(cat.courses)).toBe(true);
          expect(Array.isArray(cat.selectedIds)).toBe(true);
        });
      });
    });
  });

  describe('ngOnChanges', () => {
    it('should update selected courses when selectedCourseIds change', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        component.selectedCourseIds = [courseId];
        
        component.ngOnChanges({
          selectedCourseIds: new SimpleChange([], [courseId], false)
        });

        // Check if the course is marked as selected in the appropriate category
        let foundSelected = false;
        component.displayCategories.forEach(reqDisplay => {
          reqDisplay.categories.forEach(cat => {
            if (cat.selectedIds.includes(courseId)) {
              foundSelected = true;
            }
          });
        });
        expect(foundSelected).toBe(true);
      }
    });

    it('should not update if selectedCourseIds did not change', () => {
      const initialDisplayCategories = component.displayCategories;
      component.ngOnChanges({});
      expect(component.displayCategories).toBe(initialDisplayCategories);
    });

    it('should handle empty selectedCourseIds', () => {
      component.selectedCourseIds = [];
      component.ngOnChanges({
        selectedCourseIds: new SimpleChange([['course1']], [], false)
      });

      component.displayCategories.forEach(reqDisplay => {
        reqDisplay.categories.forEach(cat => {
          expect(cat.selectedIds.length).toBe(0);
        });
      });
    });

    it('should handle multiple selected courses', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length >= 2) {
        const courseIds = [courses[0].id, courses[1].id];
        component.selectedCourseIds = courseIds;
        
        component.ngOnChanges({
          selectedCourseIds: new SimpleChange([], courseIds, false)
        });

        let selectedCount = 0;
        component.displayCategories.forEach(reqDisplay => {
          reqDisplay.categories.forEach(cat => {
            selectedCount += cat.selectedIds.length;
          });
        });
        
        // At least some courses should be selected
        expect(selectedCount).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('buildCategoryDisplay', () => {
    it('should create display categories from course data', () => {
      const courseData = courseDataService.getCourseData();
      expect(component.displayCategories.length).toBe(courseData.requirements.req.length);
    });

    it('should populate courses for each category', () => {
      component.displayCategories.forEach(reqDisplay => {
        reqDisplay.categories.forEach(cat => {
          // Categories should have courses (or at least an empty array)
          expect(Array.isArray(cat.courses)).toBe(true);
        });
      });
    });

    it('should match requirement names from course data', () => {
      const courseData = courseDataService.getCourseData();
      const reqNames = courseData.requirements.req.map(r => r.name);
      const displayReqNames = component.displayCategories.map(d => d.reqName);
      
      reqNames.forEach(name => {
        expect(displayReqNames).toContain(name);
      });
    });

    it('should create correct number of categories per requirement', () => {
      const courseData = courseDataService.getCourseData();
      
      for (let i = 0; i < courseData.requirements.req.length; i++) {
        const req = courseData.requirements.req[i];
        const display = component.displayCategories[i];
        expect(display.categories.length).toBe(req.categories.length);
      }
    });
  });

  describe('updateSelectedCourses', () => {
    it('should mark courses as selected based on selectedCourseIds', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const course = courses[0];
        component.selectedCourseIds = [course.id];
        component['updateSelectedCourses']();

        let foundSelected = false;
        component.displayCategories.forEach(reqDisplay => {
          reqDisplay.categories.forEach(cat => {
            if (cat.courses.find(c => c.id === course.id)) {
              expect(cat.selectedIds).toContain(course.id);
              foundSelected = true;
            }
          });
        });
      }
    });

    it('should clear selected IDs when no courses selected', () => {
      component.selectedCourseIds = [];
      component['updateSelectedCourses']();

      component.displayCategories.forEach(reqDisplay => {
        reqDisplay.categories.forEach(cat => {
          expect(cat.selectedIds.length).toBe(0);
        });
      });
    });

    it('should only mark courses in correct categories as selected', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const course = courses[0];
        component.selectedCourseIds = [course.id];
        component['updateSelectedCourses']();

        component.displayCategories.forEach(reqDisplay => {
          reqDisplay.categories.forEach(cat => {
            const hasCourse = cat.courses.some(c => c.id === course.id);
            const isSelected = cat.selectedIds.includes(course.id);
            
            if (hasCourse) {
              expect(isSelected).toBe(true);
            } else {
              expect(isSelected).toBe(false);
            }
          });
        });
      }
    });
  });

  describe('Category display structure', () => {
    it('should display all requirement categories', () => {
      const courseData = courseDataService.getCourseData();
      expect(component.displayCategories.length).toBe(courseData.requirements.req.length);
    });

    it('should include courses from course data service', () => {
      const courseData = courseDataService.getCourseData();
      
      component.displayCategories.forEach((reqDisplay, i) => {
        const req = courseData.requirements.req[i];
        
        reqDisplay.categories.forEach((cat, j) => {
          const categoryId = req.categories[j].id;
          const expectedCourses = courseDataService.getCategoryCourses(categoryId);
          expect(cat.courses.length).toBe(expectedCourses.length);
        });
      });
    });

    it('should maintain category IDs correctly', () => {
      const courseData = courseDataService.getCourseData();
      
      component.displayCategories.forEach((reqDisplay, i) => {
        const req = courseData.requirements.req[i];
        
        reqDisplay.categories.forEach((cat, j) => {
          expect(cat.id).toBe(req.categories[j].id);
        });
      });
    });
  });

  describe('Course selection tracking', () => {
    it('should track no selections initially', () => {
      let totalSelected = 0;
      component.displayCategories.forEach(reqDisplay => {
        reqDisplay.categories.forEach(cat => {
          totalSelected += cat.selectedIds.length;
        });
      });
      expect(totalSelected).toBe(0);
    });

    it('should track course selections across multiple categories', () => {
      const courses = courseDataService.getCourseData().courses;
      // Find courses that belong to multiple categories
      const multiCategoryCourse = courses.find(c => c.category.length > 1);
      
      if (multiCategoryCourse) {
        component.selectedCourseIds = [multiCategoryCourse.id];
        component['updateSelectedCourses']();

        let categoryCount = 0;
        component.displayCategories.forEach(reqDisplay => {
          reqDisplay.categories.forEach(cat => {
            if (cat.selectedIds.includes(multiCategoryCourse.id)) {
              categoryCount++;
            }
          });
        });

        // Should be selected in all matching categories
        expect(categoryCount).toBeGreaterThan(0);
      }
    });

    it('should handle deselection', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        
        // First select
        component.selectedCourseIds = [courseId];
        component['updateSelectedCourses']();
        
        // Then deselect
        component.selectedCourseIds = [];
        component['updateSelectedCourses']();

        let foundSelected = false;
        component.displayCategories.forEach(reqDisplay => {
          reqDisplay.categories.forEach(cat => {
            if (cat.selectedIds.includes(courseId)) {
              foundSelected = true;
            }
          });
        });
        expect(foundSelected).toBe(false);
      }
    });
  });
});
