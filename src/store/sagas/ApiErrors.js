import { takeEvery, call, all } from "redux-saga/effects";
import * as actions from "../actions";
import { toast } from "react-toastify";

function* apiErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.code}`);
}

function* watchApiError() {
  yield all([
    takeEvery(actions.API_ERROR, apiErrorReceived),
    takeEvery(actions.DRONE_API_ERROR, apiErrorReceived)
  ]);
}

export default [watchApiError];
