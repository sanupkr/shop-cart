import {GET_ORDER_REQUEST,GET_ORDER_SUCCESS,GET_ORDER_FAIL} from "../constants/orderconstants";

export const orderreducer = (state = { orders:[] },action) => {
  switch(action.type){
    case GET_ORDER_REQUEST:
      return {
        ...state,
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orders:action.payload,
      }
    case GET_ORDER_FAIL:
      return {
        ...state,
        error:action.payload
      }

    default:
      return state
  }
}
