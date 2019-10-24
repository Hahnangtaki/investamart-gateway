import { Moment } from 'moment';

export interface ICustody {
  id?: number;
  custodyCode?: string;
  custodiName?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
}

export const defaultValue: Readonly<ICustody> = {};
