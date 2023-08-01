import {applyMiddleware,createStore, combineReducers} from 'redux';
import thunk from "redux-thunk";
import { cartReducer } from './reducers/cartReducer';
import {composeWithDevTools} from "redux-devtools-extension";
import { newReviewReducer, productDetailsReduce, productsReducer,newProductReducer,productReducer,productReviewsReducer,reviewReducer } from './reducers/productReducer';
import {forgotPasswordReducer, profileReducer, userReducer,allUsersReducer,userDetailsReducer} from './reducers/userReducer'
import { newOrderReducer,myOrdersReducer,orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducer';
const reducer=combineReducers({
   products:productsReducer,
   productDetails:productDetailsReduce,
   user:userReducer,
   profile:profileReducer,
   forgotPassword:forgotPasswordReducer,
   cart: cartReducer,
   newOrder:newOrderReducer,
   myOrders: myOrdersReducer,
   orderDetails: orderDetailsReducer,
   newReview:newReviewReducer,
   newProduct: newProductReducer,
   product: productReducer,
   allOrders:allOrdersReducer,
   order:orderReducer,
   allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});
const middleware=[thunk];

let initialState = {
   cart: {
     cartItems: localStorage.getItem("cartItems")
       ? JSON.parse(localStorage.getItem("cartItems"))
       : [],
     shippingInfo: localStorage.getItem("shippingInfo")
       ? JSON.parse(localStorage.getItem("shippingInfo"))
       : {},
   },
 };
 



const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
