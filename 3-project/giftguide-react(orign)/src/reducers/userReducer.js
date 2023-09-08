// @flow
import types from "../actions/types";

const initialState = {
  authState: false,
  user: null
};
function userReducer(state = initialState, action) {
  console.log("---- userReducer.js state ------");
  console.log(state);
  switch (action.type) {
    case types.USER.ADD:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
}

export default userReducer;
