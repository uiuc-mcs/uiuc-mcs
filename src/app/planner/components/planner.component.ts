/**
 * Based on UIUC MCS Course Planner (https://github.com/uiucmcs/courseplanner)
 * Copyright (c) 2021 UIUC MCS Community
 * Licensed under the MIT License
 */

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseDataService, Course, Track, DataScienceTrack } from '../services/course-data.service';
import { PlannerLogicService, SelectionBox, CalculationResult, Category } from '../services/planner-logic.service';
import { CategoryBrowserComponent } from './category-browser.component';
import { TrackId, Semester, TOTAL_BOXES, DEFAULT_CREDITS } from '../constants/enums';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryBrowserComponent]
})
export class PlannerComponent implements OnInit {
  categories: Category[] = [];
  selectionBoxes: SelectionBox[] = [];
  calculation: CalculationResult | null = null;
  startSemester: string = '';
  startYear: number = new Date().getFullYear();
  selectedCourse: Course | null = null;
  allCourses: Course[] = [];
  totalBoxes: number = TOTAL_BOXES;
  perCredit: number = DEFAULT_CREDITS;
  prerequisiteWarning: { show: boolean; message: string } = { show: false, message: '' };
  selectedCourseIds: string[] = [];

  // Track-related properties
  availableTracks: Track[] = [];
  selectedTrackId: string = '';
  currentTrack: Track | DataScienceTrack | null = null;
  isDataScienceTrack: boolean = false;
  trackRequirementsCollapsed: boolean = true;
  quickAddSearch: string = '';
  quickAddOpenBox: number | null = null;
  quickAddSelectedIndex: number = -1;
  breadthDetailsExpanded: boolean = false;
  advancedDetailsExpanded: boolean = false;
  electivesDetailsExpanded: boolean = false;

  constructor(
    private courseDataService: CourseDataService,
    private plannerLogicService: PlannerLogicService
  ) {
    this.categories = this.plannerLogicService.getCategories();
    this.allCourses = this.courseDataService.getCourseData().courses;
    this.startSemester = this.plannerLogicService.getCurrentSemester();
    this.availableTracks = this.courseDataService.getTracks();
  }

  ngOnInit(): void {
    this.generateSelectionBoxes();
    this.updateCalculation();
  }

  generateSelectionBoxes(): void {
    this.selectionBoxes = this.plannerLogicService.getSelectionBoxes(
      this.startSemester,
      this.startYear,
      this.totalBoxes
    );
    this.updateCalculation();
  }

  private updateSelectionBoxLabels(): void {
    // Preserve existing courses but update semester labels and years
    const newBoxes = this.plannerLogicService.getSelectionBoxes(
      this.startSemester,
      this.startYear,
      this.totalBoxes
    );

    // Update each box with new name/semester/year but keep existing courses
    for (let i = 0; i < this.selectionBoxes.length && i < newBoxes.length; i++) {
      this.selectionBoxes[i].name = newBoxes[i].name;
      this.selectionBoxes[i].semester = newBoxes[i].semester;
      this.selectionBoxes[i].year = newBoxes[i].year;
    }

    this.updateCalculation();
  }

  onSemesterChange(): void {
    this.updateSelectionBoxLabels();
  }

  onYearChange(): void {
    this.updateSelectionBoxLabels();
  }

  async addCourse(boxIndex: number): Promise<void> {
    if (!this.selectedCourse) return;

    const semester = this.selectionBoxes[boxIndex].semester;
    const course = this.selectedCourse;

    // Check if semester availability
    if (!course.semester.includes(semester)) {
      const semText = semester.charAt(0).toUpperCase() + semester.slice(1);
      const proceed = confirm(
        `${course.code} ${course.name} is usually not offered in the ${semText} semester. ` +
        `Generally offered in ${course.semester.join(', ')} semester(s).\n\nAdd to ${semText} anyway?`
      );
      if (!proceed) return;
    }

    // Check prerequisites
    const prereqCheck = this.plannerLogicService.checkPrerequisite(course.id);
    if (!prereqCheck.valid) {
      const proceed = confirm(
        `${prereqCheck.message}\n\nAdd to ${this.selectionBoxes[boxIndex].name} anyway?`
      );
      if (!proceed) return;
    }

    this.plannerLogicService.addCourse(course.id);
    this.selectionBoxes[boxIndex].courses.push(course);
    this.selectedCourse = null;
    this.updateSelectedCourseIds();
    this.updateCalculation();
  }

  removeCourse(courseId: string, boxIndex: number): void {
    const course = this.selectionBoxes[boxIndex].courses.find(c => c.id === courseId);
    if (course) {
      this.plannerLogicService.removeCourse(courseId);
      const index = this.selectionBoxes[boxIndex].courses.indexOf(course);
      if (index > -1) {
        this.selectionBoxes[boxIndex].courses.splice(index, 1);
      }
      this.updateSelectedCourseIds();
      this.updateCalculation();
    }
  }

  private updateSelectedCourseIds(): void {
    this.selectedCourseIds = this.plannerLogicService.getSelectedCourses();
  }

  updateCalculation(): void {
    this.calculation = this.plannerLogicService.calculate();
  }

  getAvailableCourses(): Course[] {
    const selected = this.plannerLogicService.getSelectedCourses();
    return this.allCourses
      .filter(c => !selected.includes(c.id))
      .sort((a, b) => {
        // Extract course numbers (e.g., "410" from "CS 410")
        const aNum = parseInt(a.code.match(/\d+/)?.[0] || '0', 10);
        const bNum = parseInt(b.code.match(/\d+/)?.[0] || '0', 10);
        return aNum - bNum;
      });
  }

  getSemesterOptions(): { label: string; code: string }[] {
    return [
      { label: 'Spring', code: Semester.SPRING },
      { label: 'Summer', code: Semester.SUMMER },
      { label: 'Fall', code: Semester.FALL }
    ];
  }

  getYearOptions(): number[] {
    const years: number[] = [];
    for (let i = this.startYear - 5; i <= this.startYear + 1; i++) {
      years.push(i);
    }
    return years;
  }

  getCourseLabel(course: Course): string {
    return `${course.code} - ${course.name}`;
  }

  hasCreditOptions(course: Course): boolean {
    return !!(course.creditOptions && course.creditOptions.length > 1);
  }

  getCreditHours(courseId: string): number {
    return this.plannerLogicService.getCreditHours(courseId);
  }

  setCreditHours(courseId: string, credits: number): void {
    this.plannerLogicService.setCreditHours(courseId, credits);
    this.updateCalculation();
  }

  selectTrack(trackId: string): void {
    this.selectedTrackId = trackId;

    if (trackId === TrackId.DATA_SCIENCE) {
      this.currentTrack = this.courseDataService.getDataScienceTrack();
      this.isDataScienceTrack = true;
    } else if (trackId) {
      const track = this.courseDataService.getTrack(trackId);
      this.currentTrack = track || null;
      this.isDataScienceTrack = false;
    } else {
      this.currentTrack = null;
      this.isDataScienceTrack = false;
    }
  }

  clearTrackSelection(): void {
    this.selectedTrackId = '';
    this.currentTrack = null;
    this.isDataScienceTrack = false;
  }

  getTrackName(trackId: string): string {
    const track = this.availableTracks.find(t => t.id === trackId);
    return track?.name || '';
  }

  getCourseName(courseId: string): string {
    const course = this.allCourses.find(c => c.id === courseId);
    return course ? `${course.code} - ${course.name}` : courseId;
  }

  getCourseCode(courseId: string): string {
    const course = this.allCourses.find(c => c.id === courseId);
    return course?.code || courseId;
  }

  getDataScienceBreadthAreas(): any[] {
    if (this.isDataScienceTrack && this.currentTrack) {
      return (this.currentTrack as any).breadthAreas || [];
    }
    return [];
  }

  getDataScienceAdvancedCourses(): string[] {
    if (this.isDataScienceTrack && this.currentTrack) {
      return (this.currentTrack as any).advancedCourseIds || [];
    }
    return [];
  }

  getDataScienceElectives(): string[] {
    if (this.isDataScienceTrack && this.currentTrack) {
      return (this.currentTrack as any).recommendedElectiveIds || [];
    }
    return [];
  }

  toggleTrackRequirementsCollapse(): void {
    this.trackRequirementsCollapsed = !this.trackRequirementsCollapsed;
  }

  isCourseSelected(courseId: string): boolean {
    return this.selectedCourseIds.includes(courseId);
  }

  async addCourseFromBox(boxIndex: number, course: Course): Promise<void> {
    const semester = this.selectionBoxes[boxIndex].semester;

    // Check if semester availability
    if (!course.semester.includes(semester)) {
      const semText = semester.charAt(0).toUpperCase() + semester.slice(1);
      const proceed = confirm(
        `${course.code} ${course.name} is usually not offered in the ${semText} semester. ` +
        `Generally offered in ${course.semester.join(', ')} semester(s).\n\nAdd to ${semText} anyway?`
      );
      if (!proceed) return;
    }

    // Check prerequisites
    const prereqCheck = this.plannerLogicService.checkPrerequisite(course.id);
    if (!prereqCheck.valid) {
      const proceed = confirm(
        `${prereqCheck.message}\n\nAdd to ${this.selectionBoxes[boxIndex].name} anyway?`
      );
      if (!proceed) return;
    }

    this.plannerLogicService.addCourse(course.id);
    this.selectionBoxes[boxIndex].courses.push(course);
    this.quickAddSearch = ''; // Clear search after adding
    this.updateSelectedCourseIds();
    this.updateCalculation();

    // Refocus the search input for quick iteration
    setTimeout(() => {
      const searchInput = document.querySelector(
        `.selection-box:nth-child(${boxIndex + 1}) .quick-add-search`
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 0);
  }

  getFilteredAvailableCourses(): Course[] {
    const searchTerm = this.quickAddSearch.toLowerCase();
    const available = this.getAvailableCourses();

    if (!searchTerm) {
      return available;
    }

    return available.filter(course =>
      course.code.toLowerCase().includes(searchTerm) ||
      course.name.toLowerCase().includes(searchTerm)
    );
  }

  toggleQuickAdd(boxIndex: number, event: Event): void {
    event.stopPropagation();
    if (this.quickAddOpenBox === boxIndex) {
      this.quickAddOpenBox = null;
      this.quickAddSelectedIndex = -1;
    } else {
      this.quickAddOpenBox = boxIndex;
      this.quickAddSelectedIndex = 0; // Start with first course selected
      // Focus the search input after the dropdown is rendered
      setTimeout(() => {
        const searchInput = document.querySelector(
          `.selection-box:nth-child(${boxIndex + 1}) .quick-add-search`
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 0);
    }
  }

  closeQuickAdd(): void {
    this.quickAddOpenBox = null;
  }

  isQuickAddOpen(boxIndex: number): boolean {
    return this.quickAddOpenBox === boxIndex;
  }

  onQuickAddKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeQuickAdd();
      this.quickAddSelectedIndex = -1;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const filteredCourses = this.getFilteredAvailableCourses();
      if (this.quickAddSelectedIndex < filteredCourses.length - 1) {
        this.quickAddSelectedIndex++;
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.quickAddSelectedIndex > 0) {
        this.quickAddSelectedIndex--;
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const filteredCourses = this.getFilteredAvailableCourses();
      if (this.quickAddSelectedIndex >= 0 && this.quickAddSelectedIndex < filteredCourses.length) {
        if (this.quickAddOpenBox !== null) {
          this.addCourseFromBox(this.quickAddOpenBox, filteredCourses[this.quickAddSelectedIndex]);
          this.quickAddSelectedIndex = -1;
        }
      }
    }
  }

  toggleBreadthDetails(): void {
    this.breadthDetailsExpanded = !this.breadthDetailsExpanded;
  }

  toggleAdvancedDetails(): void {
    this.advancedDetailsExpanded = !this.advancedDetailsExpanded;
  }

  toggleElectivesDetails(): void {
    this.electivesDetailsExpanded = !this.electivesDetailsExpanded;
  }
}
