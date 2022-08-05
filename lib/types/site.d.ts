import SiteType from './site-type';
import { Room } from './room';
import { Box } from './box';

export interface Site {
  uuid: string;
  name: string;
  type: SiteType;
  address: string;
  createdAt: string;
  updatedAt: string;
  rooms: Room[];
  boxes: Box[];
}
