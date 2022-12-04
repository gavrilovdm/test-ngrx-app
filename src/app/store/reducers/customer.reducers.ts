import {
  initialCustomerState,
  customerAdapter,
} from '../states/customer.state';
import * as customer from '../actions/customer.actions';
import { createReducer, on } from '@ngrx/store';

export const customerReducer = createReducer(
  initialCustomerState,
  on(customer.loadingCustomers, (state) => ({ ...state, loading: true })),
  on(customer.loadCustomersSuccess, (state, { response }) =>
    customerAdapter.setAll(response.customers, {
      ...state,
      error: false,
      loading: false,
      total: response.total,
    }),
  ),
  on(customer.loadCustomersFailure, (state) =>
    customerAdapter.removeAll({
      ...state,
      error: true,
      loading: false,
      total: 0,
    }),
  ),
  on(customer.addCustomer, (state, { customer }) => {
    return customerAdapter.addOne(customer, state);
    },
  ),
  on(customer.editCustomer, (state, { customer }) => {
    return customerAdapter.updateOne({ id: customer.id, changes: customer }, state);
    },
  ),
  on(customer.deleteCustomer, (state, { id }) => {
    return customerAdapter.removeOne(id, state);
    },
  ),
);
