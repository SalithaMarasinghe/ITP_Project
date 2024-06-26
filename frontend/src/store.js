import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  productReviewCreateReducer,
  productsTopRatedReducer,
} from "./redux/reducers/productReducers";
import { cartReducers } from "./redux/reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userLoggedInReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./redux/reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyOrderReducer,
  orderListOrderReducer,
  orderDeliverReducer,
} from "./redux/reducers/orderReducers";


import {
  promotionListReducer,
  promotionDetailsReducer,
  promotionCreateReducer,
  promotionUpdateReducer,
  promotionDeleteReducer,
} from "./redux/reducers/promotionReducers";

import {
  FAQListReducer,
  FAQDetailsReducer,
  FAQCreateReducer,
  FAQUpdateReducer,
  FAQDeleteReducer,
} from "./redux/reducers/FAQReducers";

import {
  inquiryListReducer,
  inquiryDetailsReducer,
  inquiryCreateReducer,
  inquiryUpdateReducer,
  inquiryDeleteReducer,
} from "./redux/reducers/inquiryReducers";

const rootReducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  productsTopRated: productsTopRatedReducer,
  cart: cartReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userLoggedIn: userLoggedInReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyOrderReducer,
  orderListOrder: orderListOrderReducer,
  orderDeliver: orderDeliverReducer,
  promotionList: promotionListReducer,
  promotionDetails: promotionDetailsReducer,
  promotionCreate: promotionCreateReducer,
  promotionUpdate: promotionUpdateReducer,
  promotionDelete: promotionDeleteReducer,
  FAQList: FAQListReducer,
  FAQDetails: FAQDetailsReducer,
  FAQCreate: FAQCreateReducer,
  FAQUpdate: FAQUpdateReducer,
  FAQDelete: FAQDeleteReducer,
  inquiryList: inquiryListReducer,
  inquiryDetails: inquiryDetailsReducer,
  inquiryCreate: inquiryCreateReducer,
  inquiryUpdate: inquiryUpdateReducer,
  inquiryDelete: inquiryDeleteReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  rootReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
