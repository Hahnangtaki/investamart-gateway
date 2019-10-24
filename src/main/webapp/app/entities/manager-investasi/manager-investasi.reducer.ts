import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IManagerInvestasi, defaultValue } from 'app/shared/model/manager-investasi.model';

export const ACTION_TYPES = {
  FETCH_MANAGERINVESTASI_LIST: 'managerInvestasi/FETCH_MANAGERINVESTASI_LIST',
  FETCH_MANAGERINVESTASI: 'managerInvestasi/FETCH_MANAGERINVESTASI',
  CREATE_MANAGERINVESTASI: 'managerInvestasi/CREATE_MANAGERINVESTASI',
  UPDATE_MANAGERINVESTASI: 'managerInvestasi/UPDATE_MANAGERINVESTASI',
  DELETE_MANAGERINVESTASI: 'managerInvestasi/DELETE_MANAGERINVESTASI',
  RESET: 'managerInvestasi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IManagerInvestasi>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ManagerInvestasiState = Readonly<typeof initialState>;

// Reducer

export default (state: ManagerInvestasiState = initialState, action): ManagerInvestasiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MANAGERINVESTASI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MANAGERINVESTASI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MANAGERINVESTASI):
    case REQUEST(ACTION_TYPES.UPDATE_MANAGERINVESTASI):
    case REQUEST(ACTION_TYPES.DELETE_MANAGERINVESTASI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MANAGERINVESTASI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MANAGERINVESTASI):
    case FAILURE(ACTION_TYPES.CREATE_MANAGERINVESTASI):
    case FAILURE(ACTION_TYPES.UPDATE_MANAGERINVESTASI):
    case FAILURE(ACTION_TYPES.DELETE_MANAGERINVESTASI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MANAGERINVESTASI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MANAGERINVESTASI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MANAGERINVESTASI):
    case SUCCESS(ACTION_TYPES.UPDATE_MANAGERINVESTASI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MANAGERINVESTASI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/manager-investasis';

// Actions

export const getEntities: ICrudGetAllAction<IManagerInvestasi> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MANAGERINVESTASI_LIST,
  payload: axios.get<IManagerInvestasi>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IManagerInvestasi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MANAGERINVESTASI,
    payload: axios.get<IManagerInvestasi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IManagerInvestasi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MANAGERINVESTASI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IManagerInvestasi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MANAGERINVESTASI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IManagerInvestasi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MANAGERINVESTASI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
