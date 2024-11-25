import React from 'react';

const reducer = (state: any, action: any) => {
  const partialState = action.state ? action.state : action;
  const index = action.index ? action.index : undefined;
  const type = action.type ? action.type : undefined;

  if (type === 'push') {
    state.push(partialState);
    return Object.values({ ...state });
  }

  if (type === 'filter') {
    state = state.filter(action.filter);
    return state;
  }

  if (index === undefined) {
    if (Array.isArray(partialState)) {
      return partialState;
    }

    return { ...state, ...partialState };
  }

  const item = { ...state[index], ...partialState };

  state[index] = item;

  return state;
};

const usePartialState = (initialState: any) => {
  return React.useReducer(reducer, initialState);
};

export default usePartialState;
