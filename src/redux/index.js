import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from './cartRedux/cartReducer'

export default combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

// const cartItemsInLocalStorage = localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart"))
//     : [];

// const INITIAL_STATE = {
//     cart: {
//         cartItems: cartItemsInLocalStorage,
//     },
// };