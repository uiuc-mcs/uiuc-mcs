import { Component } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'dialog-on-delete-dialog',
  templateUrl: 'dialog-on-delete-dialog.html',
  standalone: true,
  imports: [MatDialogModule]
})
export class DialogOnDelete {}