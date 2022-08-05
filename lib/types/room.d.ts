import { Site } from './site';
export interface Room {
  uuid: string;
  name: string;
  location: Site;
  createdAt: string;
  updatedAt: string;
}
