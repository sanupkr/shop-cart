import axios from "axios";
import {ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERROR,GET_SELECTED_PRODUCT,REMOVE_SELECTED_PRODUCT}  from "../constants/productconstant";

export const getproducts = (keyword='',currentpage = 1) => async (dispatch) => {


      try{
        dispatch({
          type:ALL_PRODUCTS_REQUEST
        })

        const {data} = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentpage}`);

        dispatch({
          type:ALL_PRODUCTS_SUCCESS,
          payload:data
        })


      }catch(error){
          dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
          })
      }
}

export const clearerror = () => (dispatch) => {
  dispatch({type:CLEAR_ERROR});
}

export const getsingleproduct = (data) => {

    return ({
      type:GET_SELECTED_PRODUCT,
      payload:data
    })

}



export const removeselectedproduct = () => {

    return ({
      type:REMOVE_SELECTED_PRODUCT,
    })

}
