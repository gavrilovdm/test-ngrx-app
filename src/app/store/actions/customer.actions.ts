import { createAction, props } from "@ngrx/store";
import { CustomerParams } from '../../core/models/customer/customer-params';
import { CustomerResponse } from "../../core/models/customer/customer-response";
import { Customer } from '../../core/models/customer/customer';

enum CustomerActionType {
  Loading = "[Customer] Loading",
  LoadCustomersSuccess = "[Customer] Loaded Success",
  loadCustomersFailure = "[Customer] Loaded Failure",

  addCustomer = "[Customer] Customer added",
  editCustomer = "[Customer] Customer edited",
  deleteCustomer = "[Customer] Customer deleted",
}

export const loadingCustomers = createAction(
  CustomerActionType.Loading,
  props<{ params: CustomerParams }>()
);

export const loadCustomersSuccess = createAction(
  CustomerActionType.LoadCustomersSuccess,
  props<{ response: CustomerResponse }>()
);

export const loadCustomersFailure = createAction(
  CustomerActionType.loadCustomersFailure,
  props<{ error: any }>()
);

export const addCustomer = createAction(
  CustomerActionType.addCustomer,
  props<{ customer: Customer }>()
);

export const editCustomer = createAction(
  CustomerActionType.editCustomer,
  props<{ customer: Customer }>()
);

export const deleteCustomer = createAction(
  CustomerActionType.deleteCustomer,
  props<{ id: string }>()
);
