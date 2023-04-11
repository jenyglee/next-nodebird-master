import user from "./user"
import post from "./post"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    // HYDRATE는 서버 사이드 렌더링을 할 때 상태를 클라이언트로 전달할 때 사용됩니다.
    index: (state = {}, action) => {
        switch (action.type) {
            case "HYDRATE":
                console.log("HYDRATE", action)
                return { ...state, ...action.payload }
            default:
                return state
        }
    },
    user,
    post,
})

export default rootReducer
