import { Moment } from 'moment';
import { IInstrument } from 'app/shared/model/instrument.model';

export interface ICurrency {
  id?: number;
  currencyCode?: string;
  currencyName?: string;
  currencySymbol?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
  instruments?: IInstrument[];
}

export const defaultValue: Readonly<ICurrency> = {};
