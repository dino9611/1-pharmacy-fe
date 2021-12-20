const INITIAL_STATE = {
    id: 0,
    username: "",
    email: "",
    isVerified: false,
    isAdmin: true,
    isLogin: true,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, ...action.payload, isLogin: true };
        default:
            return state;
    }
};

export default authReducer;