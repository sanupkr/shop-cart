import {GET_ORDER_REQUEST,GET_ORDER_SUCCESS,GET_ORDER_FAIL} from "../constants/orderconstants";
import axios from "axios";
export const getorderuser = () => async (dispatch) => {


  try{
    dispatch({
      type: GET_ORDER_REQUEST,
    })

    const {data} = await axios.get("api/v1/order/user");

    dispatch({type:GET_ORDER_SUCCESS, payload:data.order});


  }catch(error){

    dispatch({type:GET_ORDER_FAIL,payload:error.response.data.message})
  }




}
