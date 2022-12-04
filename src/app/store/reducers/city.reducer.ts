import { CityInterface } from '../../core/models/city.interface';
import { CityAction, CityActionType } from '../actions/city.actions';

const initialState: Array<CityInterface> = [
  {
    name: 'Moscow',
    // refuelers: [
    //   {
    //     user: 'user1',
    //     location: 'Moscow City district',
    //     serviceZone: 'Moscow City',
    //     auto: 'vaz-2210',
    //     autoCoordinates: 'some coordinates providing to the map',
    //     phone: '+79951234567',
    //     schedule: 'Mn - Fr, 10:00 - 18:00',
    //     status: 'active',
    //   },
    // ],
    // fuelProviders: [
    //   {
    //     fuelType: 'Petrol DT',
    //     fuelVolume: 'litre',
    //     waitingTime: 'dynamic data',
    //     fuelStations: [
    //       {
    //         name: 'ST-1',
    //         location: 'Pushkin st, 68',
    //       }
    //     ],
    //     isAreaClosed: false,
    //     advanceCall: '1 hour',
    //   }
    // ]
  },
  {
    name: 'Sochi'
  },
  {
    name: 'Perm'
  },
];

export function cityReducer(
  state: Array<CityInterface> = initialState,
  action: CityAction
) {
  switch (action.type) {
    case CityActionType.ADD_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
}
