import { SET_TITLE } from '../action-types/top-toolbar-actions';

export const topToolbarInitialState = {
  title: ''
};

const setTitle = (state, { payload }) => ({ ...state, title: payload });

export default {
  [SET_TITLE]: setTitle
};
