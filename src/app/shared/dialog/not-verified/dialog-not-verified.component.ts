import { Component } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
    selector: 'dialog-not-verified-dialog',
    templateUrl: 'dialog-not-verified-dialog.html',
    standalone: true,
    imports: [MatDialogModule]
})
export class DialogNotVerified { }