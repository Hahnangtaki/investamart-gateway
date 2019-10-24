import { Moment } from 'moment';

export interface IBank {
  id?: number;
  bankCode?: string;
  bankName?: string;
  initialName?: string;
  biCode?: string;
  swiftCode?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
}

export const defaultValue: Readonly<IBank> = {};
