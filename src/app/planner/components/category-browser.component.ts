/**
 * Based on UIUC MCS Course Planner (https://github.com/uiucmcs/courseplanner)
 * Copyright (c) 2021 UIUC MCS Community
 * Licensed under the MIT License
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDataService, Course, RequirementCategory } from '../services/course-data.service';

interface CategoryDisplay {
  reqName: string;
  categories: Array<{
    id: string;
    name: string;
    courses: Course[];
    selectedIds: string[];
  }>;
}

@Component({
  selector: 'app-category-browser',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="category-browser">
      <h2>Requirement Categories</h2>

      <div class="requirements-section" *ngFor="let req of displayCategories; let i = index">
        <h3>{{ req.reqName }}</h3>

        <div class="categories-grid">
          <div class="category-item" *ngFor="let cat of req.categories">
            <h4>{{ cat.name }}</h4>
            <div class="courses-list">
              <div class="course"
                   *ngFor="let course of cat.courses"
                   [class.selected]="cat.selectedIds.includes(course.id)">
                <span class="code">{{ course.code }}</span>
                <span class="name">{{ course.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="clear: both;"></div>
    </div>
  `,
  styles: [`
    .category-browser {
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      margin-bottom: 30px;

      h2 {
        margin-top: 0;
        color: #333;
        border-bottom: 2px solid #1976d2;
        padding-bottom: 10px;
      }
    }

    .requirements-section {
      margin-bottom: 30px;

      h3 {
        color: #1976d2;
        margin: 20px 0 15px 0;
        font-size: 16px;
      }
    }

    .requirements-section:nth-of-type(2),
    .requirements-section:nth-of-type(3) {
      display: inline-block;
      
      margin-right: 16px;
      vertical-align: top;
    }

    .requirements-section:nth-of-type(3) {
      margin-right: 0;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 15px;
    }

    .category-item {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      h4 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 14px;
        font-weight: 600;
      }
    }

    .courses-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .course {
      display: flex;
      gap: 8px;
      padding: 8px;
      background: #f5f5f5;
      border-radius: 4px;
      border-left: 3px solid #ccc;
      transition: all 0.2s;

      &.selected {
        background: #e8f4fd;
        border-left-color: #4caf50;

        .code {
          color: #4caf50;
          font-weight: 700;
        }
      }

      &:hover {
        background: #f0f0f0;
      }

      .code {
        font-weight: 600;
        color: #1976d2;
        min-width: 60px;
        font-size: 12px;
      }

      .name {
        font-size: 12px;
        color: #555;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  `]
})
export class CategoryBrowserComponent implements OnChanges {
  @Input() selectedCourseIds: string[] = [];

  displayCategories: CategoryDisplay[] = [];

  constructor(private courseDataService: CourseDataService) {
    this.buildCategoryDisplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCourseIds']) {
      this.updateSelectedCourses();
    }
  }

  private buildCategoryDisplay(): void {
    const data = this.courseDataService.getCourseData();
    this.displayCategories = [];

    for (const req of data.requirements.req) {
      const categoryDisplay: CategoryDisplay = {
        reqName: req.name,
        categories: []
      };

      for (const cat of req.categories) {
        const courses = this.courseDataService.getCategoryCourses(cat.id);
        categoryDisplay.categories.push({
          id: cat.id,
          name: cat.name,
          courses,
          selectedIds: []
        });
      }

      this.displayCategories.push(categoryDisplay);
    }

    this.updateSelectedCourses();
  }

  private updateSelectedCourses(): void {
    for (const req of this.displayCategories) {
      for (const cat of req.categories) {
        cat.selectedIds = cat.courses
          .filter(c => this.selectedCourseIds.includes(c.id))
          .map(c => c.id);
      }
    }
  }
}
