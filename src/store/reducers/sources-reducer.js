import { SET_DATA } from '../action-types/sources-action-types';

export const sourcesInitialState = {
  data: [],
  meta: {
    limit: 50,
    offset: 0,
    count: 0
  }
};

const setData = (state, { payload }) => ({ ...state, ...payload });

export default {
  [SET_DATA]: setData
};
