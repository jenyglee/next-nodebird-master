import shortId from "shortid";
import produce from "immer";
import { faker } from "@faker-js/faker";

export const initialState = {
    mainPosts: [],
    imagePaths: [], // 이미지 업로드할때 경로가 들어감
    hasMorePosts: true,
    loadPostsLoading: false, // 게시글 불러오기 시도중
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false, // 게시글 추가 시도중
    addPostDone: false,
    addPostError: null,
    removePostLoading: false, // 게시글 삭제 시도중
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false, // 댓글 추가 시도중
    addCommentDone: false,
    addCommentError: null,
};

export const generateDummyPost = (number) =>
    Array(number)
        .fill()
        .map((v, i) => ({
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.paragraph(),
            Images: [
                {
                    src: faker.image.image(),
                },
            ],
            Comment: [
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: faker.name.findName(),
                    },
                    content: faker.lorem.sentence(),
                },
            ],
        }));

initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});
export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: "제로초",
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: "제로초",
    },
});

// reducer : 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(단, 불변성은 지키면서)
const reducer = (state = initialState, action) =>
    // 🔥immer로 감싸주는 법
    // 1. return produce()로 switch문을 감싸준다.
    produce(state, (draft) => {
        switch (action.type) {
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMorePosts = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                // 2. 기존에 있던 return문을 제거하고 ...state로 되어있는 것들은 지운다. 변경되는 값 앞에 'draft'를 추가해준다. 그럼 알아서 불변성으로 변경해준다.
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            // 👇 immer 사용 전 코드
            // return {
            //     ...state,
            //     addPostLoading: true,
            //     addPostDone: false,
            //     addPostError: null,
            // };
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                // ✨3. 배열을 복사하며 불변성을 지켰던 것들이 알아서 지켜지니 unshift()만 사용해도 된다.
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
                // 👇 immer 사용 전 코드
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex] };
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                // return {
                //   ...state,
                //   mainPosts,
                //   addCommentLoading: false,
                //   addCommentDone: true,
                // };
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;
