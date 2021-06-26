
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,
  REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL,
  CLEAR_ERROR,
  LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,
  LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL,
  UPDATE_USER_REQUEST,UPDATE_USER_SUCCESS,UPDATE_USER_FAIL,
  UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL} from "../constants/userconstants";
import axios from "axios";

export const loginuser = (email,password) => async (dispatch) => {

  try{
    dispatch({
      type: LOGIN_REQUEST
    })

    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    const {data} = await axios.post("/api/v1/login",{email,password},config);

    dispatch({type:LOGIN_SUCCESS,
    payload: data.user
    })

  }catch(error){
      dispatch({
        type:LOGIN_FAIL,
        payload:error.response.data.message
      })
  }

}

export const registeruser = (userdata) => async (dispatch) => {

  try{
    dispatch({
      type: REGISTER_REQUEST
    })

    const config = {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }

    const {data} = await axios.post("/api/v1/register",userdata,config);

    dispatch({type:REGISTER_SUCCESS,
    payload: data.user
    })

  }catch(error){
      dispatch({
        type:REGISTER_FAIL,
        payload:error.response.data.message
      })
  }

}

export const loaduser = () => async (dispatch) => {

  try{
    dispatch({
      type: LOAD_USER_REQUEST
    })


    const {data} = await axios.get("/api/v1/me");

    dispatch({type:LOAD_USER_SUCCESS,
    payload: data.user
    })

  }catch(error){
      dispatch({
        type:LOAD_USER_FAIL,
        payload:error.response.data.message
      })
  }

}

export const logoutuser = () => async(dispatch) => {
  try{
    dispatch({type:LOGOUT_REQUEST})

     await axios.get("/api/v1/logout");

    dispatch({
      type:LOGOUT_SUCCESS,
       payload:null
     })

  }catch(error){
    dispatch({
      type:LOGOUT_FAIL,
      payload:error.response.data.message
    })
  }
}

export const updateuser = (username,email) => async(dispatch) => {
  try{
    dispatch({type:UPDATE_USER_REQUEST})

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

     const {data} = await axios.put("/api/v1/me/update",{username,email},config);

    dispatch({
      type:UPDATE_USER_SUCCESS,
       payload:data.user
     })

  }catch(error){
    dispatch({
      type:UPDATE_USER_FAIL,
      payload:error.response.data.message
    })
  }
}

export const updatepassword = (oldpassword,newpassword) => async(dispatch) => {
    try{
      dispatch({type:UPDATE_PASSWORD_REQUEST})

    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    const {data} = await axios.put("/api/v1/password/change",{oldpassword,newpassword},config);

    dispatch({
      type:UPDATE_PASSWORD_SUCCESS,
       payload:data.user
     })
   }catch(error){
     dispatch({
       type:UPDATE_PASSWORD_FAIL,
       payload:error.response.data.message
     })
   }
}

export const forgotpassword = (email) => async(dispatch) => {
  try{

    dispatch({
      type:FORGOT_PASSWORD_REQUEST
    })

    const config = {
      headers:{
        'Content-type': 'application/json'
      }
    }

    const {data} = await axios.post("/api/v1/password/forgot",{email},config);

    dispatch({
      type:FORGOT_PASSWORD_SUCCESS,
      payload:data.message
    })

  }catch(error){
    dispatch({
      type:FORGOT_PASSWORD_FAIL,
      payload:error.response.data.message
    })
  }
}

export const resetpassword_util = (resetpassword,confirmresetpassword,token) => async (dispatch) =>{


  try{
    dispatch({type:RESET_PASSWORD_REQUEST})
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }

  const {data} = await axios.put(`/api/v1/password/reset/${token}`,{resetpassword,confirmresetpassword},config);

  dispatch({
    type:RESET_PASSWORD_SUCCESS,
    payload:data.success
  })
}catch(error){
      dispatch({type:RESET_PASSWORD_FAIL,
        payload:error.response.data.message
  })
}

}

export const clearerrors = () => (dispatch) => {
    dispatch({type:CLEAR_ERROR})
}
