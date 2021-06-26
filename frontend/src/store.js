import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import {productreducers,productdetailsreducer} from "./reducers/productreducers";
import {userreducer,forgotpasswordreducer,resetpasswordreducer} from "./reducers/userreducers";
import {cartreducer} from "./reducers/cartreducers";
import {orderreducer} from "./reducers/orderreducers";
const reducer = combineReducers({
  products:productreducers,
  product:productdetailsreducer,
  user:userreducer,
  forgotpassword:forgotpasswordreducer,
  resetpassword:resetpasswordreducer,
  cart:cartreducer,
  order:orderreducer,
})


let initialState = {
  cart:{
    cartitems:localStorage.getItem('cartitems')?JSON.parse(localStorage.getItem('cartitems')):[],
    shippinginfo:localStorage.getItem('shippinginfo')?JSON.parse(localStorage.getItem('shippinginfo')):{}
  }
}

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
