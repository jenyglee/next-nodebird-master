import { createWrapper } from "next-redux-wrapper"
import { applyMiddleware, compose, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
// import thunkMiddleware from "redux-thunk"
import createSagaMiddleware from "redux-saga"
import reducer from "../reducers"
import rootSaga from "../sagas"

// action이 dispatcha되는 것들을 logging 하는 미들웨어
// 미들웨어는 항상 화살표 3개를 가진다(3단 고차함수)
const loggerMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        console.log(action)
        return next(action)
    }

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware, loggerMiddleware]
    const enhancer =
        process.env.NODE_ENV === "production"
            ? compose(applyMiddleware(...middlewares))
            : composeWithDevTools(applyMiddleware(...middlewares)) // 개발자모드에서 DevTools 사용 세팅한다.
    const store = createStore(reducer, enhancer)
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store
}
const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === "development",
})

export default wrapper
