import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SpinnerComponent } from '@shared/spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private dialogRef: MatDialogRef<SpinnerComponent> | null = null;
  private dialog = inject(MatDialog);

  open() {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(SpinnerComponent, {
        disableClose: true,
        height: '200px',
        panelClass: 'transparent-dialog',
      });
    }
    return this.dialogRef.afterClosed();
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
