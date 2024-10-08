import { Component } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'dialog-review-sumission-dialog',
  templateUrl: 'dialog-review-submission-dialog.html',
  standalone: true,
  imports: [MatDialogModule]
})
export class DialogReviewSubmission {}