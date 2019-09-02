import ReducerRegistry, { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import topToolbarReducer, { topToolbarInitialState } from './reducers/top-toolbar-reducer';

let registry;

export const init = (...middleware) => {
  if (registry) {
    throw new Error('store already initialized');
  }

  registry = new ReducerRegistry({}, [
    promiseMiddleware,
    ...middleware
  ]);

  registry.register({
    topToolbarReducer: applyReducerHash(topToolbarReducer, topToolbarInitialState)
  });
  return registry;
};

export const getStore = () => registry.getStore();

export const register = (...args) => registry.register(...args);
