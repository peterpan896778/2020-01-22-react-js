// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import prepareUserFromToken from "../../auth/prepareUserFromToken";

import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FORGET_PASSWORD
} from "../../constants/actionTypes";

import {
  loginUserSuccess,
  loginUserFailed,
  registerUserSuccess,
  registerUserFailed,
  forgetPasswordSuccess,
  forgetPasswordFailed
} from "./actions";

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
  console.log("Called...");
  return fetch(url, options)
    .then(response => {
      console.log(url);
      if (!response.status === 200) {
        throw response.json();
      }
      return response.json();
    })
    .then(json => {
      console.log("2222222222222222");

      return json;
    })
    .catch(error => {
      throw error;
    });
};

/**
 * Sets the session
 * @param {*} user
 */
const setSession = user => {
  let cookies = new Cookies();
  if (user) cookies.set("user", JSON.stringify(user), { path: "/" });
  else cookies.remove("user");
};
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* login({ payload: { username, password } }) {
  const options = {
    body: JSON.stringify({ username, password }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}auth/login`,
      options
    );
    if (response.token) {
      const decoded = prepareUserFromToken(response.token);
      setSession(decoded);
      yield put(loginUserSuccess(decoded));
    }
    yield put(loginUserFailed(response.message));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(loginUserFailed(message));
    setSession(null);
  }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
  try {
    setSession(null);
    yield call(() => {
      history.push("/login");
    });
  } catch (error) {}
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password } }) {
  const options = {
    body: JSON.stringify({ fullname, email, password }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    const response = yield call(fetchJSON, "/users/register", options);
    yield put(registerUserSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(registerUserFailed(message));
  }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
  const options = {
    body: JSON.stringify({ username }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    const response = yield call(fetchJSON, "/users/password-reset", options);
    yield put(forgetPasswordSuccess(response.message));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(forgetPasswordFailed(message));
  }
}

export function* watchLoginUser(): any {
  yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser(): any {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser(): any {
  yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword(): any {
  yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga(): any {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgetPassword)
  ]);
}

export default authSaga;
