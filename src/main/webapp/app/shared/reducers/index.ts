import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import globalParameter, {
  GlobalParameterState
} from 'app/entities/global-parameter/global-parameter.reducer';
// prettier-ignore
import currency, {
  CurrencyState
} from 'app/entities/currency/currency.reducer';
// prettier-ignore
import instrument, {
  InstrumentState
} from 'app/entities/instrument/instrument.reducer';
// prettier-ignore
import city, {
  CityState
} from 'app/entities/city/city.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import province, {
  ProvinceState
} from 'app/entities/province/province.reducer';
// prettier-ignore
import tax, {
  TaxState
} from 'app/entities/tax/tax.reducer';
// prettier-ignore
import bank, {
  BankState
} from 'app/entities/bank/bank.reducer';
// prettier-ignore
import custody, {
  CustodyState
} from 'app/entities/custody/custody.reducer';
// prettier-ignore
import managerInvestasi, {
  ManagerInvestasiState
} from 'app/entities/manager-investasi/manager-investasi.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly globalParameter: GlobalParameterState;
  readonly currency: CurrencyState;
  readonly instrument: InstrumentState;
  readonly city: CityState;
  readonly country: CountryState;
  readonly province: ProvinceState;
  readonly tax: TaxState;
  readonly bank: BankState;
  readonly custody: CustodyState;
  readonly managerInvestasi: ManagerInvestasiState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  globalParameter,
  currency,
  instrument,
  city,
  country,
  province,
  tax,
  bank,
  custody,
  managerInvestasi,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
