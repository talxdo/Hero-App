import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {SpinnerComponent} from "@shared/spinner/spinner.component";
import {Dialog} from "@angular/cdk/dialog";


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  dialogRef: MatDialogRef<SpinnerComponent> = inject(MatDialog).open(SpinnerComponent, {
    disableClose: true, height: '200px', panelClass: 'transparent-dialog', 
  });

  open() {
    return this.dialogRef.afterClosed();
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
