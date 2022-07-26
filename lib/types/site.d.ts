import Location from './location';

export interface Site {
  uuid: string;
  name: string;
  locations: Location[];
  createdAt: string;
  updatedAt: string;
}
