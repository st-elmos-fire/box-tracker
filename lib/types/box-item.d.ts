import { PackedStatus } from './packed-status';

export interface BoxItem {
  uuid: string;
  imageUrl?: string;
  boxNumber: number;
  quantity: number;
  status: PackedStatus;
  fragile?: boolean;
  createdAt: string;
  updatedAt: string;
}
