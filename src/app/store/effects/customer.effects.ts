import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, of, Observable } from 'rxjs';
import { CustomerParams } from '../../core/models/customer/customer-params';
import { CustomerResponse } from '../../core/models/customer/customer-response';
import { CustomerService } from '../../core/services/customer.service';
import {
  addCustomer,
  deleteCustomer, editCustomer,
  loadCustomersFailure,
  loadCustomersSuccess,
  loadingCustomers,
} from '../actions/customer.actions';
import { Customer } from '../../core/models/customer/customer';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private service: CustomerService) {
  }

  public loadCustomer$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingCustomers),
        switchMap((payload: { params: CustomerParams }) =>
          this.service.getCustomers(payload.params).pipe(
            map((response: CustomerResponse) =>
              loadCustomersSuccess({ response }),
            ),
            catchError((error: HttpErrorResponse) =>
              of(loadCustomersFailure({ error })),
            ),
          ),
        ),
      ),
  );

  public addCustomer$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(addCustomer),
        switchMap((payload: { customer: Customer }) =>
          this.service.addCustomer(payload.customer),
        ),
      ),
  );

  public editCustomer$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(editCustomer),
        switchMap((payload: { customer: Customer }) =>
          this.service.editCustomer(payload.customer),
        ),
      ),
  );

  public deleteCustomer$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(deleteCustomer),
        switchMap((payload: { id: string }) =>
          this.service.removeCustomer(payload.id),
        ),
      ),
  );
}
