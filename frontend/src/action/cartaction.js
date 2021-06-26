import {ADD_TO_CART,REMOVE_FROM_CART,ADD_SHIPPING_INFO,CLEAR_CART} from "../constants/cartconstants";
import axios from "axios";
export const addtocart = (id,quantity) => async (dispatch,getState) => {

    const {data} =await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload:{
        product: data.product._id,
        price:data.product.price,
        name:data.product.name,
        stock:data.product.stock,
        image:data.product.images[0].url,
        quantity
      }

    })

    localStorage.setItem('cartitems', JSON.stringify(getState().cart.cartitems));



}

export const deletefromcart = (id) => async (dispatch) => {
    dispatch({type:REMOVE_FROM_CART, payload:id})
}

export const clearcart = () => async (dispatch,getState) => {
  dispatch({type:CLEAR_CART})
  
}

export const addshippinginfo = (data) => async (dispatch) => {
    dispatch({type:ADD_SHIPPING_INFO,
    payload:data
  })

  localStorage.setItem('shippinginfo',JSON.stringify(data));
}
