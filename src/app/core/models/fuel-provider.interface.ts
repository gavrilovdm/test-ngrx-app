export interface FuelProviderInterface {
  fuelType: string;
  fuelVolume: string;
  waitingTime: string;
  fuelStations: FuelStationInterface[];
  isAreaClosed: boolean;
  advanceCall: string;
}

interface FuelStationInterface {
  name: string;
  location: string;
}
