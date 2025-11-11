import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PlannerComponent } from './planner.component';
import { CourseDataService, Course } from '../services/course-data.service';
import { PlannerLogicService } from '../services/planner-logic.service';
import { CategoryBrowserComponent } from './category-browser.component';

describe('PlannerComponent', () => {
  let component: PlannerComponent;
  let fixture: ComponentFixture<PlannerComponent>;
  let courseDataService: CourseDataService;
  let plannerLogicService: PlannerLogicService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerComponent, FormsModule, CategoryBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerComponent);
    component = fixture.componentInstance;
    courseDataService = TestBed.inject(CourseDataService);
    plannerLogicService = TestBed.inject(PlannerLogicService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.categories).toBeDefined();
      expect(component.selectionBoxes).toBeDefined();
      expect(component.allCourses).toBeDefined();
      expect(component.availableTracks).toBeDefined();
      expect(component.startSemester).toBeDefined();
      expect(component.startYear).toBeDefined();
    });

    it('should load categories from planner logic service', () => {
      expect(component.categories.length).toBeGreaterThan(0);
    });

    it('should load all courses from course data service', () => {
      expect(component.allCourses.length).toBeGreaterThan(0);
    });

    it('should load available tracks', () => {
      expect(Array.isArray(component.availableTracks)).toBe(true);
    });

    it('should set current semester on initialization', () => {
      expect(['spring', 'summer', 'fall']).toContain(component.startSemester);
    });

    it('should generate selection boxes on init', () => {
      expect(component.selectionBoxes.length).toBe(component.totalBoxes);
    });

    it('should have calculation result after init', () => {
      expect(component.calculation).toBeDefined();
    });
  });

  describe('generateSelectionBoxes', () => {
    it('should generate correct number of boxes', () => {
      component.totalBoxes = 9;
      component.generateSelectionBoxes();
      expect(component.selectionBoxes.length).toBe(9);
    });

    it('should update calculation after generating boxes', () => {
      const initialCalc = component.calculation;
      component.generateSelectionBoxes();
      expect(component.calculation).toBeDefined();
    });
  });

  describe('onSemesterChange', () => {
    it('should update selection box labels when semester changes', () => {
      component.startSemester = 'fall';
      component.onSemesterChange();
      expect(component.selectionBoxes[0].semester).toBe('fall');
    });

    it('should preserve existing courses when changing semester', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        component.selectionBoxes[0].courses.push(courses[0]);
        const initialCourseCount = component.selectionBoxes[0].courses.length;
        component.startSemester = 'summer';
        component.onSemesterChange();
        expect(component.selectionBoxes[0].courses.length).toBe(initialCourseCount);
      }
    });
  });

  describe('onYearChange', () => {
    it('should update selection box labels when year changes', () => {
      component.startYear = 2025;
      component.onYearChange();
      expect(component.selectionBoxes[0].year).toBe(2025);
    });

    it('should preserve existing courses when changing year', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        component.selectionBoxes[0].courses.push(courses[0]);
        const initialCourseCount = component.selectionBoxes[0].courses.length;
        component.startYear = 2026;
        component.onYearChange();
        expect(component.selectionBoxes[0].courses.length).toBe(initialCourseCount);
      }
    });
  });

  describe('removeCourse', () => {
    it('should remove course from selection box', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const course = courses[0];
        component.selectionBoxes[0].courses.push(course);
        plannerLogicService.addCourse(course.id);
        
        component.removeCourse(course.id, 0);
        
        expect(component.selectionBoxes[0].courses).not.toContain(course);
      }
    });

    it('should update calculation after removing course', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const course = courses[0];
        component.selectionBoxes[0].courses.push(course);
        plannerLogicService.addCourse(course.id);
        
        component.removeCourse(course.id, 0);
        
        expect(component.calculation).toBeDefined();
      }
    });

    it('should handle removing non-existent course gracefully', () => {
      const initialLength = component.selectionBoxes[0].courses.length;
      component.removeCourse('non-existent-xyz', 0);
      expect(component.selectionBoxes[0].courses.length).toBe(initialLength);
    });
  });

  describe('getAvailableCourses', () => {
    it('should return courses not already selected', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        plannerLogicService.addCourse(courses[0].id);
        component.selectedCourseIds = [courses[0].id];
        
        const available = component.getAvailableCourses();
        expect(available.find(c => c.id === courses[0].id)).toBeUndefined();
      }
    });

    it('should sort courses by course number', () => {
      const available = component.getAvailableCourses();
      for (let i = 1; i < available.length; i++) {
        const prevNum = parseInt(available[i - 1].code.match(/\d+/)?.[0] || '0', 10);
        const currNum = parseInt(available[i].code.match(/\d+/)?.[0] || '0', 10);
        expect(currNum).toBeGreaterThanOrEqual(prevNum);
      }
    });
  });

  describe('getSemesterOptions', () => {
    it('should return three semester options', () => {
      const options = component.getSemesterOptions();
      expect(options.length).toBe(3);
    });

    it('should include spring, summer, and fall', () => {
      const options = component.getSemesterOptions();
      const codes = options.map(o => o.code);
      expect(codes).toContain('spring');
      expect(codes).toContain('summer');
      expect(codes).toContain('fall');
    });
  });

  describe('getYearOptions', () => {
    it('should return year options', () => {
      const options = component.getYearOptions();
      expect(options.length).toBeGreaterThan(0);
    });

    it('should include current year', () => {
      const options = component.getYearOptions();
      expect(options).toContain(component.startYear);
    });

    it('should include past and future years', () => {
      const options = component.getYearOptions();
      expect(options.length).toBeGreaterThan(3);
    });
  });

  describe('hasCreditOptions', () => {
    it('should return true for courses with multiple credit options', () => {
      const courses = courseDataService.getCourseData().courses;
      const courseWithOptions = courses.find(c => c.creditOptions && c.creditOptions.length > 1);
      if (courseWithOptions) {
        expect(component.hasCreditOptions(courseWithOptions)).toBe(true);
      }
    });

    it('should return false for courses without credit options', () => {
      const courses = courseDataService.getCourseData().courses;
      const courseWithoutOptions = courses.find(c => !c.creditOptions || c.creditOptions.length <= 1);
      if (courseWithoutOptions) {
        expect(component.hasCreditOptions(courseWithoutOptions)).toBe(false);
      }
    });
  });

  describe('getCreditHours and setCreditHours', () => {
    it('should get credit hours from planner logic service', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const credits = component.getCreditHours(courses[0].id);
        expect(typeof credits).toBe('number');
        expect(credits).toBeGreaterThan(0);
      }
    });

    it('should set credit hours and update calculation', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const courseId = courses[0].id;
        component.setCreditHours(courseId, 3);
        expect(plannerLogicService.getCreditHours(courseId)).toBe(3);
      }
    });
  });

  describe('Track Selection', () => {
    it('should select track', () => {
      const tracks = component.availableTracks;
      if (tracks.length > 0) {
        component.selectTrack(tracks[0].id);
        expect(component.selectedTrackId).toBe(tracks[0].id);
        expect(component.currentTrack).toBeDefined();
      }
    });

    it('should clear track selection', () => {
      const tracks = component.availableTracks;
      if (tracks.length > 0) {
        component.selectTrack(tracks[0].id);
        component.clearTrackSelection();
        expect(component.selectedTrackId).toBe('');
        expect(component.currentTrack).toBeNull();
      }
    });

    it('should identify data science track', () => {
      component.selectTrack('ds');
      expect(component.isDataScienceTrack).toBe(true);
    });
  });

  describe('getTrackName', () => {
    it('should return track name for valid id', () => {
      const tracks = component.availableTracks;
      if (tracks.length > 0) {
        const name = component.getTrackName(tracks[0].id);
        expect(name).toBe(tracks[0].name);
      }
    });

    it('should return empty string for invalid id', () => {
      const name = component.getTrackName('invalid-track-xyz');
      expect(name).toBe('');
    });
  });

  describe('getCourseName and getCourseCode', () => {
    it('should return course name for valid id', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const name = component.getCourseName(courses[0].id);
        expect(name).toContain(courses[0].code);
        expect(name).toContain(courses[0].name);
      }
    });

    it('should return course code for valid id', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        const code = component.getCourseCode(courses[0].id);
        expect(code).toBe(courses[0].code);
      }
    });

    it('should return course id when course not found', () => {
      const name = component.getCourseName('invalid-xyz');
      expect(name).toBe('invalid-xyz');
      
      const code = component.getCourseCode('invalid-xyz');
      expect(code).toBe('invalid-xyz');
    });
  });

  describe('toggleTrackRequirementsCollapse', () => {
    it('should toggle collapse state', () => {
      const initialState = component.trackRequirementsCollapsed;
      component.toggleTrackRequirementsCollapse();
      expect(component.trackRequirementsCollapsed).toBe(!initialState);
    });
  });

  describe('isCourseSelected', () => {
    it('should return true for selected course', () => {
      const courses = courseDataService.getCourseData().courses;
      if (courses.length > 0) {
        component.selectedCourseIds = [courses[0].id];
        expect(component.isCourseSelected(courses[0].id)).toBe(true);
      }
    });

    it('should return false for non-selected course', () => {
      component.selectedCourseIds = [];
      expect(component.isCourseSelected('some-course-id')).toBe(false);
    });
  });

  describe('Quick Add functionality', () => {
    it('should toggle quick add dropdown', () => {
      const event = new Event('click');
      component.toggleQuickAdd(0, event);
      expect(component.quickAddOpenBox).toBe(0);
      
      component.toggleQuickAdd(0, event);
      expect(component.quickAddOpenBox).toBeNull();
    });

    it('should close quick add', () => {
      component.quickAddOpenBox = 0;
      component.closeQuickAdd();
      expect(component.quickAddOpenBox).toBeNull();
    });

    it('should check if quick add is open', () => {
      component.quickAddOpenBox = 0;
      expect(component.isQuickAddOpen(0)).toBe(true);
      expect(component.isQuickAddOpen(1)).toBe(false);
    });

    it('should filter available courses', () => {
      component.quickAddSearch = '';
      const allAvailable = component.getFilteredAvailableCourses();
      
      component.quickAddSearch = '410';
      const filtered = component.getFilteredAvailableCourses();
      
      expect(filtered.length).toBeLessThanOrEqual(allAvailable.length);
    });

    it('should handle quick add keyboard navigation', () => {
      component.quickAddOpenBox = 0;
      component.quickAddSelectedIndex = 0;
      
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onQuickAddKeydown(downEvent);
      expect(component.quickAddSelectedIndex).toBe(1);
      
      const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onQuickAddKeydown(upEvent);
      expect(component.quickAddSelectedIndex).toBe(0);
      
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onQuickAddKeydown(escEvent);
      expect(component.quickAddOpenBox).toBeNull();
    });
  });

  describe('Detail toggles', () => {
    it('should toggle breadth details', () => {
      const initial = component.breadthDetailsExpanded;
      component.toggleBreadthDetails();
      expect(component.breadthDetailsExpanded).toBe(!initial);
    });

    it('should toggle advanced details', () => {
      const initial = component.advancedDetailsExpanded;
      component.toggleAdvancedDetails();
      expect(component.advancedDetailsExpanded).toBe(!initial);
    });

    it('should toggle electives details', () => {
      const initial = component.electivesDetailsExpanded;
      component.toggleElectivesDetails();
      expect(component.electivesDetailsExpanded).toBe(!initial);
    });
  });

  describe('Data Science Track methods', () => {
    beforeEach(() => {
      component.selectTrack('ds');
    });

    it('should get breadth areas for data science track', () => {
      const areas = component.getDataScienceBreadthAreas();
      expect(Array.isArray(areas)).toBe(true);
      if (component.isDataScienceTrack) {
        expect(areas.length).toBeGreaterThan(0);
      }
    });

    it('should get advanced courses for data science track', () => {
      const courses = component.getDataScienceAdvancedCourses();
      expect(Array.isArray(courses)).toBe(true);
      if (component.isDataScienceTrack) {
        expect(courses.length).toBeGreaterThan(0);
      }
    });

    it('should get electives for data science track', () => {
      const electives = component.getDataScienceElectives();
      expect(Array.isArray(electives)).toBe(true);
    });

    it('should return empty array when not data science track', () => {
      component.clearTrackSelection();
      expect(component.getDataScienceBreadthAreas()).toEqual([]);
      expect(component.getDataScienceAdvancedCourses()).toEqual([]);
      expect(component.getDataScienceElectives()).toEqual([]);
    });
  });

  describe('Edge cases and confirm dialogs', () => {
    it('should handle addCourseFromBox with wrong semester and user confirmation', async () => {
      const courses = courseDataService.getCourseData().courses;
      const fallOnlyCourse = courses.find((c: Course) => 
        c.semester.includes('fall') && !c.semester.includes('spring')
      );
      
      if (fallOnlyCourse) {
        component.selectionBoxes[0].semester = 'spring';
        
        spyOn(window, 'confirm').and.returnValue(true);
        await component.addCourseFromBox(0, fallOnlyCourse);
        
        expect(component.selectionBoxes[0].courses).toContain(fallOnlyCourse);
      }
    });

    it('should handle Enter key in quick add with valid selection', () => {
      component.quickAddOpenBox = 0;
      component.quickAddSelectedIndex = 0;
      component.quickAddSearch = '';
      
      const filteredCourses = component.getFilteredAvailableCourses();
      if (filteredCourses.length > 0) {
        spyOn(component, 'addCourseFromBox');
        
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        component.onQuickAddKeydown(enterEvent);
        
        expect(component.addCourseFromBox).toHaveBeenCalledWith(0, filteredCourses[0]);
      }
    });
  });
});
