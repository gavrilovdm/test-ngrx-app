import { Action } from '@ngrx/store';
import { CityInterface } from '../../core/models/city.interface';

export enum CityActionType {
  ADD_ITEM = '[CITY] Add City',
}

export class AddItemAction implements Action {
  readonly type = CityActionType.ADD_ITEM;
  // add an optional payload
  constructor(public payload: CityInterface) {
  }
}

export type CityAction = AddItemAction;
