// @flow
import axios from "axios";
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest
} from "redux-saga/effects";

import types from "../actions/types";


/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
  return axios(url, options)
    .then(json => {
      return json.data;
    })
    .catch(error => {
      throw error;
    });
};

export function* watchAddUser() {
  yield takeEvery(types.USER.ADD, addUser);
}

function* addUser(payload) {
  try {
  } catch (error) {}
}

function* userSaga() {
  yield takeLatest(types.USER.ADD, addUser);
}

export default userSaga;
