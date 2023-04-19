import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

// // 통신 API 호출 함수는 generate 함수가 아니다.
// function loginAPI(data) {
//     return axios.post("/api/login", data)
// }

// function* login(action) {
//     // 7. 로그인할 때 데이터가 필요한데, watchLogin 함수에서 login 함수를 호출할 때 매개변수로 보내준다. { action.type : "LOG_IN_REQUEST", action.data : ID/PW }
//     // 5. 실패할 경우도 있으니 try-catch문에 넣어준다.
//     try {
//         // 3. 로그인 API 실행 함수를 호출한다.
//         // const result = yield call(loginAPI, action.data) // 8. loginAPI(action.data) << 이거랑 같은 건데 형태만 다른 것이다.
//         yield delay(1000)

//         // 4. 'LOG_IN_SUCCESS' 액션을 실행시킨다. 전달할 데이터도 함께 넣어준다. (dispatch와 비슷한 놈)
//         yield put({
//             type: "LOG_IN_SUCCESS",
//             // data: result.data,
//         })
//     } catch (err) {
//         // 6. 실패했을 때 실행시킬 액션도 넣어준다.
//         yield put({
//             type: "LOG_IN_FAILURE",
//             data: err.response.data,
//         })
//     }
// }

// function logoutAPI() {
//     return axios.post("/api/logout")
// }

// function* logout() {
//     try {
//         // const result = yield call(logoutAPI)
//         yield delay(1000)

//         yield put({
//             type: "LOG_OUT_SUCCESS",
//             // data: result.data,
//         })
//     } catch (err) {
//         yield put({
//             type: "LOG_OUT_FAILURE",
//             data: err.response.data,
//         })
//     }
// }

// function addPostAPI(data) {
//     return axios.post("/api/post", data)
// }

// function* addPost(action) {
//     try {
//         // const result = yield call(addPostAPI, action.data)
//         yield delay(1000)

//         yield put({
//             type: "ADD_POST_SUCCESS",
//             // data: result.data,
//         })
//     } catch (err) {
//         yield put({
//             type: "ADD_POST_FAILURE",
//             data: err.response.data,
//         })
//     }
// }

// // 'watch 어쩌구' 함수는 이벤트리스터와 같은 역할
// function* watchLogin() {
//     // 2-1. 'LOG_IN_REQUEST' action이 실행될 때까지 기다리겠다.
//     // 2-2. 'LOG_IN_REQUEST' action이 실행되면 login이라는 generate 함수를 호출한다.
//     // 9. take로 쓰면 이 함수가 한번만 실행되면 사라져버리기 때문에 takeLatest로 변경한다. 이 기능은 while(true)와 비슷하며 이걸로 변경함으로서 무한히 사용할 수 있는 완전한 이벤트리스너 형태라고 볼 수 있다.
//     yield takeLatest("LOG_IN_REQUEST", login)
// }

// function* watchLogout() {
//     yield takeLatest("LOG_OUT_REQUEST", logout)
// }

// function* watchAddPost() {
//     yield takeLatest("ADD_POST_REQUEST", addPost)
// }

export default function* rootSaga() {
    // 1. all : fork나 call로 실행하는 것들을 동시에 전부 실행할 수 있게 해준다.
    yield all([fork(postSaga), fork(userSaga)]);
}
