import { Site } from './site';
export interface Box {
  uuid: string;
  boxNumber: number;
  roomID: string;
  source: Site;
  destination: Site;
  currentLocation: Site;
  contents: string[] | [];
  createdAt: string;
  updatedAt: string;
}
