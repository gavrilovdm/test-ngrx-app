import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { GlobalState } from '../../../store/states/global.state';
import { Store, select } from '@ngrx/store';
import {
  selectAllCustomer,
  selectCustomerTotal,
  selectCustomerError,
  selectCustomerLoading,
} from '../../../store/selectors/customer.selectors';
import {
  addCustomer,
  deleteCustomer, editCustomer,
  loadingCustomers,
} from '../../../store/actions/customer.actions';
import { Observable, merge, Subject, Subscription, filter, map } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Customer } from '../../../core/models/customer/customer';
import { AddEditCustomerDialogComponent } from '../../../core/components/customer-dialog/add-edit-customer-dialog.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'user',
    'location',
    'serviceZone',
    'auto',
    'autoCoordinates',
    'phone',
    'schedule',
    'status',
    'actions',
  ];
  public dataSource: MatTableDataSource<Customer>;
  public customerTotal: number;
  public noData: Customer[] = [<Customer>{}];
  public loading: boolean;
  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();
  public defaultSort: Sort = { active: 'status', direction: 'asc' };

  private filter: string = '';
  private subscription: Subscription = new Subscription();

  constructor(public store: Store<GlobalState>, public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.store
      .pipe(select(selectAllCustomer))
      .subscribe((customers: Customer[]) => this.initializeData(customers));
    this.store
      .pipe(select(selectCustomerTotal))
      .subscribe((total) => (this.customerTotal = total));
    this.subscription.add(
      this.store.pipe(select(selectCustomerLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      }),
    );
    this.error$ = this.store.pipe(select(selectCustomerError));
  }

  public ngAfterViewInit(): void {
    this.loadCustomers();
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      }),
    );

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0)),
    );

    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadCustomers()))
        .subscribe(),
    );
  }

  private loadCustomers(): void {
    this.store.dispatch(
      loadingCustomers({
        params: {
          filter: this.filter.toLocaleLowerCase(),
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          sortDirection: this.sort.direction,
          sortField: this.sort.active,
        },
      }),
    );
  }

  public addCustomer(customer: Customer): void {
    this.store.dispatch(
      addCustomer({ customer }),
    );
    this.loadCustomers();
  }

  public editCustomer(customer: Customer): void {
    this.store.dispatch(
      editCustomer({ customer }),
    );
    this.loadCustomers();
  }

  public deleteCustomer(id: string): void {
    this.store.dispatch(
      deleteCustomer({ id: id }),
    );
    this.loadCustomers();
  }

  private initializeData(customers: Customer[]): void {
    this.dataSource = new MatTableDataSource(
      customers.length ? customers : this.noData,
    );
  }

  openDialog(customer?: Customer, edit?: boolean) {
    const dialogRef = this.dialog.open(AddEditCustomerDialogComponent, {
      data: { customer, edit },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(result => result),
        map(result => {
          console.log(result);
          if (result?.edit) return this.editCustomer(result.customer);
          return this.addCustomer(result.customer);
        }),
      ).subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void {
    this.loadCustomers();
  }
}
