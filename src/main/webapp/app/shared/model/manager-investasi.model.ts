import { Moment } from 'moment';

export interface IManagerInvestasi {
  id?: number;
  miCode?: string;
  miName?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
}

export const defaultValue: Readonly<IManagerInvestasi> = {};
