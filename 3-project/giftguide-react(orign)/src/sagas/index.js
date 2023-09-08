import { all, spawn } from "redux-saga/effects";
import userSagas from "./userSagas";

export default function* rootSaga(getState) {
  yield all([spawn(userSagas)]);
}
