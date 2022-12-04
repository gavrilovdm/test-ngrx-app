import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../models/customer/customer';

@Component({
  templateUrl: 'add-edit-customer-dialog.component.ts.html',
  selector: 'add-edit-customer-dialog',
  styleUrls: ['add-edit-customer-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditCustomerDialogComponent implements OnInit {
  formGroup = new FormGroup({
    id: new FormControl(''),
    user: new FormControl({ value: null, disabled: this.data.edit }, { validators: Validators.required }),
    location: new FormControl(null, { validators: Validators.required }),
    serviceZone: new FormControl(null, { validators: Validators.required }),
    auto: new FormControl(null, { validators: Validators.required }),
    autoCoordinates: new FormControl(null, { validators: Validators.required }),
    phone: new FormControl(null, { validators: Validators.required }),
    schedule: new FormControl(null, { validators: Validators.required }),
    status: new FormControl(null, { validators: Validators.required }),
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer?: Customer, edit: boolean },
  ) {
  }

  ngOnInit() {
    if (this.data?.customer) {
      this.formGroup.patchValue(this.data.customer);
    }
  }

  close(save?: boolean): void {
    if (save && this.formGroup.valid) {
      let customer = this.formGroup.value;
      if (customer.id === '' && !this.data?.edit) customer.id = Math.random().toString(36).slice(2);
      return this.dialogRef.close({ customer, edit: this.data.edit });
    }

    return this.dialogRef.close(false);
  }
}
