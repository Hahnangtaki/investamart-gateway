import { Moment } from 'moment';

export interface IInstrument {
  id?: number;
  instrumentCode?: string;
  instrumentType?: string;
  instrumentShortCode?: string;
  instrumentName?: string;
  price?: number;
  priceDate?: Moment;
  haircut?: number;
  haricutDate?: Moment;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
  currencyId?: number;
}

export const defaultValue: Readonly<IInstrument> = {};
