import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchDroneData() {
  const { error, data } = yield call(
    API.getDroneData
  );
  if (error) {
    console.log({ error });
    yield put({
      type: actions.DRONE_API_ERROR,
      code: error.code ? error.code : "Something went wrong."
    });
    yield cancel();
    return;
  }
  yield put({ type: actions.DRONE_DATA_RECEIVED, data });
}

function* watchDroneDataLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE_DATA, watchFetchDroneData)
  ]);
}

export default [watchDroneDataLoad];
