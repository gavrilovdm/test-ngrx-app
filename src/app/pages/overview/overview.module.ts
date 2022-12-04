import { NgModule } from '@angular/core';
import { OverviewRoutingModule } from './overview-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/shared/material.module';
import { OverviewComponent } from './overview/overview.component';
import { AddEditCustomerDialogComponent } from '../../core/components/customer-dialog/add-edit-customer-dialog.component';

@NgModule({
  declarations: [
    OverviewComponent,
    AddEditCustomerDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [OverviewRoutingModule],
})
export class OverviewModule {
}
