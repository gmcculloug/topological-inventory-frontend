import { SET_DATA } from '../action-types/vms-action-types';

export const vmsInitialState = {
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
