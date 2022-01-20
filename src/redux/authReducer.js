const INITIAL_STATE = {
    id: 0,
    username: "",
    email: "",
    isVerified: false,
    isAdmin: false,
    isLogin: false,
    hasReloaded: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, ...action.payload, isLogin: true, hasReloaded: true };
        case "NO_ACCESS_TOKEN":
            return { ...state, hasReloaded: true };
        case "LOGOUT":
            return { ...INITIAL_STATE, hasReloaded: true };
        default:
            return state;
    }
};

export default authReducer;