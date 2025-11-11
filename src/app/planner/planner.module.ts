import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlannerComponent } from './components/planner.component';

@NgModule({
  declarations: [
    PlannerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PlannerComponent
  ]
})
export class PlannerModule { }
