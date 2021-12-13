const INITIAL_STATE = {
    isAdmin: false,
    isLoggedIn: false
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default authReducer;