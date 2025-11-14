import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseChartComponent } from './course-chart.component';
import { ClassService } from 'src/app/services/classes/class.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CourseChartComponent', () => {
  let component: CourseChartComponent;
  let fixture: ComponentFixture<CourseChartComponent>;
  let mockClassService: jasmine.SpyObj<ClassService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock services
    mockClassService = jasmine.createSpyObj('ClassService', [], {
      classes: of([])
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ CourseChartComponent ],
      providers: [
        { provide: ClassService, useValue: mockClassService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    expect(component['classesSubscription']).toBeDefined();
    component.ngOnDestroy();
    expect(component['classesSubscription']?.closed).toBe(true);
  });

  it('should destroy chart on destroy', () => {
    const mockChart = jasmine.createSpyObj('Chart', ['destroy']);
    component.chart = mockChart;
    component.ngOnDestroy();
    expect(mockChart.destroy).toHaveBeenCalled();
  });
});
