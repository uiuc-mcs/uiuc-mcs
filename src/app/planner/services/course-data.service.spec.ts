import { TestBed } from '@angular/core/testing';
import { CourseDataService, Course, Track, DataScienceTrack } from './course-data.service';

describe('CourseDataService', () => {
  let service: CourseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCourseData', () => {
    it('should return course data object', () => {
      const data = service.getCourseData();
      expect(data).toBeDefined();
      expect(data.courses).toBeDefined();
      expect(data.requirements).toBeDefined();
      expect(data.tracks).toBeDefined();
      expect(data.dataScience).toBeDefined();
    });

    it('should return course data with valid structure', () => {
      const data = service.getCourseData();
      expect(Array.isArray(data.courses)).toBe(true);
      expect(Array.isArray(data.tracks)).toBe(true);
      expect(data.requirements.total).toBeDefined();
      expect(data.requirements.total.required).toBeDefined();
      expect(data.requirements.total.minimum_credit).toBeDefined();
      expect(Array.isArray(data.requirements.req)).toBe(true);
    });
  });

  describe('getCourse', () => {
    it('should return a course when valid id is provided', () => {
      const data = service.getCourseData();
      if (data.courses.length > 0) {
        const courseId = data.courses[0].id;
        const course = service.getCourse(courseId);
        expect(course).toBeDefined();
        expect(course?.id).toBe(courseId);
      }
    });

    it('should return undefined when invalid id is provided', () => {
      const course = service.getCourse('invalid-course-id-xyz');
      expect(course).toBeUndefined();
    });

    it('should return course with all required properties', () => {
      const data = service.getCourseData();
      if (data.courses.length > 0) {
        const course = service.getCourse(data.courses[0].id);
        expect(course).toBeDefined();
        if (course) {
          expect(course.id).toBeDefined();
          expect(course.code).toBeDefined();
          expect(course.name).toBeDefined();
          expect(Array.isArray(course.semester)).toBe(true);
          expect(Array.isArray(course.category)).toBe(true);
        }
      }
    });
  });

  describe('getSemesterCourses', () => {
    it('should return courses for spring semester', () => {
      const courses = service.getSemesterCourses('spring');
      expect(Array.isArray(courses)).toBe(true);
      courses.forEach(course => {
        expect(course.semester).toContain('spring');
      });
    });

    it('should return courses for summer semester', () => {
      const courses = service.getSemesterCourses('summer');
      expect(Array.isArray(courses)).toBe(true);
      courses.forEach(course => {
        expect(course.semester).toContain('summer');
      });
    });

    it('should return courses for fall semester', () => {
      const courses = service.getSemesterCourses('fall');
      expect(Array.isArray(courses)).toBe(true);
      courses.forEach(course => {
        expect(course.semester).toContain('fall');
      });
    });

    it('should return empty array for invalid semester', () => {
      const courses = service.getSemesterCourses('invalid');
      expect(Array.isArray(courses)).toBe(true);
      expect(courses.length).toBe(0);
    });

    it('should not return courses that do not match the semester', () => {
      const allCourses = service.getCourseData().courses;
      const springCourses = service.getSemesterCourses('spring');
      const fallOnlyCourses = allCourses.filter(c => 
        c.semester.includes('fall') && !c.semester.includes('spring')
      );
      
      fallOnlyCourses.forEach(fallCourse => {
        expect(springCourses.find(c => c.id === fallCourse.id)).toBeUndefined();
      });
    });
  });

  describe('getCategoryCourses', () => {
    it('should return courses for a valid category', () => {
      const data = service.getCourseData();
      if (data.requirements.req.length > 0 && data.requirements.req[0].categories.length > 0) {
        const categoryId = data.requirements.req[0].categories[0].id;
        const courses = service.getCategoryCourses(categoryId);
        expect(Array.isArray(courses)).toBe(true);
        courses.forEach(course => {
          expect(course.category).toContain(categoryId);
        });
      }
    });

    it('should return empty array for invalid category', () => {
      const courses = service.getCategoryCourses('invalid-category-xyz');
      expect(Array.isArray(courses)).toBe(true);
      expect(courses.length).toBe(0);
    });

    it('should not return courses that do not match the category', () => {
      const allCourses = service.getCourseData().courses;
      const data = service.getCourseData();
      if (data.requirements.req.length > 0 && data.requirements.req[0].categories.length > 0) {
        const categoryId = data.requirements.req[0].categories[0].id;
        const categoryCourses = service.getCategoryCourses(categoryId);
        const nonCategoryCourses = allCourses.filter(c => !c.category.includes(categoryId));
        
        nonCategoryCourses.forEach(nonCatCourse => {
          expect(categoryCourses.find(c => c.id === nonCatCourse.id)).toBeUndefined();
        });
      }
    });
  });

  describe('getTracks', () => {
    it('should return an array of tracks', () => {
      const tracks = service.getTracks();
      expect(Array.isArray(tracks)).toBe(true);
    });

    it('should return tracks with all required properties', () => {
      const tracks = service.getTracks();
      tracks.forEach(track => {
        expect(track.id).toBeDefined();
        expect(track.name).toBeDefined();
        expect(track.description).toBeDefined();
        expect(Array.isArray(track.requirements)).toBe(true);
      });
    });
  });

  describe('getTrack', () => {
    it('should return a track when valid id is provided', () => {
      const tracks = service.getTracks();
      if (tracks.length > 0) {
        const trackId = tracks[0].id;
        const track = service.getTrack(trackId);
        expect(track).toBeDefined();
        expect(track?.id).toBe(trackId);
      }
    });

    it('should return undefined when invalid id is provided', () => {
      const track = service.getTrack('invalid-track-id-xyz');
      expect(track).toBeUndefined();
    });
  });

  describe('getDataScienceTrack', () => {
    it('should return data science track', () => {
      const track = service.getDataScienceTrack();
      expect(track).toBeDefined();
      expect(track.id).toBeDefined();
      expect(track.name).toBeDefined();
      expect(track.description).toBeDefined();
      expect(Array.isArray(track.breadthAreas)).toBe(true);
      expect(Array.isArray(track.advancedCourseIds)).toBe(true);
      expect(Array.isArray(track.recommendedElectiveIds)).toBe(true);
    });

    it('should return data science track with valid breadth areas', () => {
      const track = service.getDataScienceTrack();
      track.breadthAreas.forEach(area => {
        expect(area.name).toBeDefined();
        expect(area.required).toBeDefined();
        expect(typeof area.required).toBe('number');
        expect(Array.isArray(area.courseIds)).toBe(true);
      });
    });

    it('should return data science track with course IDs that exist', () => {
      const track = service.getDataScienceTrack();
      const allCourseIds = service.getCourseData().courses.map(c => c.id);
      
      // Check advanced course IDs
      track.advancedCourseIds.forEach(courseId => {
        expect(allCourseIds).toContain(courseId);
      });

      // Check breadth area course IDs
      track.breadthAreas.forEach(area => {
        area.courseIds.forEach(courseId => {
          expect(allCourseIds).toContain(courseId);
        });
      });

      // Check recommended elective IDs
      track.recommendedElectiveIds.forEach(courseId => {
        expect(allCourseIds).toContain(courseId);
      });
    });
  });
});
