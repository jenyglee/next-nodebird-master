import axios from "axios"
import { all, delay, fork, put, takeLatest } from "redux-saga/effects"
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
} from "../reducers/user"

function loginAPI(data) {
    return axios.post("/api/login", data)
}

function* login(action) {
    try {
        // const result = yield call(loginAPI, action.data) // 8. loginAPI(action.data) << 이거랑 같은 건데 형태만 다른 것이다.
        yield delay(1000)
        yield put({
            type: LOG_IN_SUCCESS,
            // data: result.data,
            data: action.data, // 백엔드에서 API 만들어지면 위에걸로 변경
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }
}

function logoutAPI() {
    return axios.post("/api/logout")
}

function* logout() {
    try {
        // const result = yield call(logoutAPI)
        yield delay(1000)

        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data,
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}

function signupAPI() {
    return axios.post("/api/signup")
}

function* signup(action) {
    try {
        // const result = yield call(signupAPI)
        yield delay(1000)

        yield put({
            type: SIGN_UP_SUCCESS,
            // data: result.data,
            data: action.data, // 백엔드에서 API 만들어지면 위에걸로 변경
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout)
}

function* watchSignup() {
    yield takeLatest(SIGN_UP_REQUEST, signup)
}

export default function* userSaga() {
    yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup)])
}
