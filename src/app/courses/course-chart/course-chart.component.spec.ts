import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChartComponent } from './course-chart.component';

describe('CourseChartComponent', () => {
  let component: CourseChartComponent;
  let fixture: ComponentFixture<CourseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
