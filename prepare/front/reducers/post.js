export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "이재원",
            },
            content: "이재원짱짱맨걸",
            Images: [
                {
                    src: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fad%2Fcd%2F5d%2Fadcd5dd4ca610b47802b81392a8dbff6.jpg&type=sc960_832",
                },
                {
                    src: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fad%2F17%2F9a%2Fad179aa1d8f54e43bcadc0cd59ebedd9--green-and-brown-blue-green.jpg&type=sc960_832",
                },
                {
                    src: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F74%2F1c%2Fcc%2F741ccc39becefdadeb1e6d1068e84976.jpg&type=sc960_832",
                },
            ],
        },
    ],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default reducer
