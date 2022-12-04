import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from '../models/customer/customer';
import { CustomerParams } from '../models/customer/customer-params';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CustomerResponse } from '../models/customer/customer-response';

@Injectable({providedIn: 'root'})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  public getCustomers(params: CustomerParams): Observable<CustomerResponse> {
    // return this.httpClient.post<Customer[]>("localhost:4200/customers", params);
    return of(this.getFakeCustomers(params)).pipe(delay(1000));
  }

  public addCustomer(customer: Customer): Observable<any> {
    customers.push(customer);
    return of();
  }

  public editCustomer(editedCustomer: Customer): Observable<any> {
    let customerIndex;

    customers.forEach(customer => {
      if (customer.id === editedCustomer.id) customerIndex = customers.indexOf(customer)
    });
    customers[customerIndex] = { ...editedCustomer };
    return of();
  }

  public removeCustomer(id: string): Observable<any> {
    let customerIndex;
    customers.forEach(customer => {
      if (customer.id === id) customerIndex = customers.indexOf(customer)
    });
    customers.splice(customerIndex, 1);
    return of();
  }

  private getFakeCustomers(params: CustomerParams): CustomerResponse {
    let data = <Customer[]>[];

    data = customers.filter(c => ~(c.user.toLocaleLowerCase()).indexOf(params.filter)
      || ~(c.location.toLocaleLowerCase()).indexOf(params.filter));

    data.sort(
      (a, b) =>
        ((a as any)[params.sortField] > (b as any)[params.sortField] ? 1 : -1) *
        (params.sortDirection === "asc" ? 1 : -1)
    );

    return {
      total: data.length,
      customers: data.slice((params.pageIndex) * params.pageSize, (params.pageIndex + 1) * params.pageSize)
    };
  }
}

const customers: Customer[] = [
  {
    id: "1",
    user: 'user1',
    location: 'Moscow',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'active'
  },
  {
    id: "2",
    user: 'user2',
    location: 'Sochi',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'active'
  },
  {
    id: "3",
    user: 'user3',
    location: 'Perm',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'inactive'
  },
  {
    id: "4",
    user: 'user4',
    location: 'Sochi',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'active'
  },
  {
    id: "5",
    user: 'user5',
    location: 'Sochi',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'inactive'
  },
  {
    id: "6",
    user: 'user6',
    location: 'Moscow',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'active'
  },
  {
    id: "7",
    user: 'user7',
    location: 'Moscow',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'inactive'
  },
  {
    id: "8",
    user: 'user8',
    location: 'Moscow',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'inactive'
  },
  {
    id: "9",
    user: 'user9',
    location: 'Moscow',
    serviceZone: 'Pushkin district',
    auto: 'vaz-2210',
    autoCoordinates: 'some coordinates',
    phone: '+79951234567',
    schedule: 'Mn - Fr, 10:00 - 18:00',
    status: 'active'
  }
];
