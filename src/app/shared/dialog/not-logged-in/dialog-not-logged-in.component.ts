import { Component } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
    selector: 'dialog-not-logged-in-dialog',
    templateUrl: 'dialog-not-logged-in-dialog.html',
    imports: [MatDialogModule]
})
export class DialogNotLoggedIn { }