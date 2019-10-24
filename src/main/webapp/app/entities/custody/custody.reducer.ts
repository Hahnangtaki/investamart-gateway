import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustody, defaultValue } from 'app/shared/model/custody.model';

export const ACTION_TYPES = {
  FETCH_CUSTODY_LIST: 'custody/FETCH_CUSTODY_LIST',
  FETCH_CUSTODY: 'custody/FETCH_CUSTODY',
  CREATE_CUSTODY: 'custody/CREATE_CUSTODY',
  UPDATE_CUSTODY: 'custody/UPDATE_CUSTODY',
  DELETE_CUSTODY: 'custody/DELETE_CUSTODY',
  RESET: 'custody/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustody>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CustodyState = Readonly<typeof initialState>;

// Reducer

export default (state: CustodyState = initialState, action): CustodyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTODY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTODY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTODY):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTODY):
    case REQUEST(ACTION_TYPES.DELETE_CUSTODY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTODY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTODY):
    case FAILURE(ACTION_TYPES.CREATE_CUSTODY):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTODY):
    case FAILURE(ACTION_TYPES.DELETE_CUSTODY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTODY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTODY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTODY):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTODY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTODY):
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

const apiUrl = 'api/custodies';

// Actions

export const getEntities: ICrudGetAllAction<ICustody> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUSTODY_LIST,
  payload: axios.get<ICustody>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICustody> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTODY,
    payload: axios.get<ICustody>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICustody> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTODY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustody> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTODY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustody> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTODY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
