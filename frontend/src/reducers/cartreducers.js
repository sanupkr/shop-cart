import {ADD_TO_CART,REMOVE_FROM_CART,ADD_SHIPPING_INFO,CLEAR_CART} from "../constants/cartconstants";

export const cartreducer = (state = { cartitems:[],shippinginfo : {} }, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;

        const itemexistincart = state.cartitems.find(i => i.product === item.product);


        if(itemexistincart)
        {
            return{
              ...state,
              cartitems: state.cartitems.map(i=>i.product===itemexistincart.product?item:i)
            }
        }
        else{
          return{
            ...state,
            cartitems:[...state.cartitems,item]
          }
        }
      case REMOVE_FROM_CART:
        return{
          ...state,
          cartitems: state.cartitems.filter(i=>i.product!==action.payload)
        }
      case ADD_SHIPPING_INFO:
        return {
          ...state,
          shippinginfo:action.payload
        }
      case CLEAR_CART:
        return {
          ...state,
          cartitems:[]
        }

      default:
        return state;

    }
}
