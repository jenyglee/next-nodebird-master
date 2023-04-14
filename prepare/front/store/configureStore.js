import { createWrapper } from "next-redux-wrapper"
import { applyMiddleware, compose, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import reducer from "../reducers"

// action이 dispatcha되는 것들을 logging 하는 미들웨어
// 미들웨어는 항상 화살표 3개를 가진다(3단 고차함수)
const loggerMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        // 이 "액션"이 실제로 함수라면 호출하고 결과를 반환합니다.
        if (typeof action === "function") {
            // action이 원래는 객체인데 redux-thunk에서는 action을 function으로 둘 수 있다. action이 function이면 지연함수이기 떄문에 그 액션을 나중에 실행시켜줄 수 있다.
            return action(dispatch, getState)
        }

        // 그렇지 않으면 평소와 같이 미들웨어 체인 아래로 작업을 전달합니다.
        return next(action)
    }

const configureStore = () => {
    const middlewares = [thunkMiddleware, loggerMiddleware]
    const enhancer =
        process.env.NODE_ENV === "production"
            ? compose(applyMiddleware(...middlewares))
            : composeWithDevTools(applyMiddleware(...middlewares)) // 개발자모드에서 DevTools 사용 세팅한다.
    const store = createStore(reducer, enhancer)
    return store
}
const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === "development",
})

export default wrapper
