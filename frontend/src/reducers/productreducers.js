import {ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERROR,GET_SELECTED_PRODUCT,REMOVE_SELECTED_PRODUCT}  from "../constants/productconstant";


export const productreducers = (state = { products : [] }, action) => {
    switch(action.type)
    {
      case ALL_PRODUCTS_REQUEST:
        return {
          loading : true,
          products : []
        }
      case ALL_PRODUCTS_SUCCESS:
        return {
          loading : false,
          products : action.payload.products,
          resperpage:action.payload.perpage,
          productcount:action.payload.productcount
        }
      case ALL_PRODUCTS_FAIL:
        return {
          loading : false,
          error : action.payload
        }
      case CLEAR_ERROR:
        return {
          ...state,
          error:null
        }
      default:
        return state
    }
}

export const productdetailsreducer = (state = {} , {type, payload}) => {

    switch(type)
    {
      case GET_SELECTED_PRODUCT:
        return {...state,...payload};
      case REMOVE_SELECTED_PRODUCT:
        return {};
      default:
        return state
    }

}
