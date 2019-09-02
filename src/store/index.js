import ReducerRegistry, { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import topToolbarReducer, { topToolbarInitialState } from './reducers/top-toolbar-reducer';
import sourcesReducer, { sourcesInitialState } from './reducers/sources-reducer';
import vmsReducer, { vmsInitialState } from './reducers/vms-reducer';

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
    topToolbarReducer: applyReducerHash(topToolbarReducer, topToolbarInitialState),
    sourcesReducer: applyReducerHash(sourcesReducer, sourcesInitialState),
    vmsReducer: applyReducerHash(vmsReducer, vmsInitialState)
  });
  return registry;
};

export const getStore = () => registry.getStore();

export const register = (...args) => registry.register(...args);
