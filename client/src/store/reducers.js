/* eslint-disable */

// Initial State Object.
const initialState = {};

const LOGOUT = (state, { payload }) => {
  return initialState;
};

const SAVETOKEN = (state, { payload }) => {
  return { ...state, token: payload.token };
};
const reducers = {
  LOGOUT,
  SAVETOKEN,
};

export default function (state = initialState, action) {
  try {
    return reducers[action.type](state, action);
  } catch (error) {
    return state;
  }
}
