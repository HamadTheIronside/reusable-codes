import { combineReducers, EnhancedStore, Reducer } from "@reduxjs/toolkit";

export function createReducerManager(store: EnhancedStore, defaultReducers: Record<string, Reducer>) {
  const reducers = { ...defaultReducers };

  return {
    add: (reducersToAdd: Record<string, Reducer>) => {
      Object.entries(reducersToAdd).forEach(([key, reducer]) => {
        if (!key || reducers[key]) {
          return;
        }

        // Add the reducer to the reducer mapping
        reducers[key] = reducer;

        // Generate a new combined reducer
        store.replaceReducer(combineReducers(reducers));
      });
    },

    // Removes a reducer with the specified key
    remove: (reducersToRemove: Record<string, Reducer>) => {
      Object.entries(reducersToRemove).forEach(([key]) => {
        if (!key || !reducers[key]) {
          return;
        }

        // Remove it from the reducer mapping
        delete reducers[key];

        // Generate a new combined reducer
        store.replaceReducer(combineReducers(reducers));
      });
    },
  };
}
