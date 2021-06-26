
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL,LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,LOAD_USER_FAIL,LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL,UPDATE_USER_REQUEST,UPDATE_USER_SUCCESS,UPDATE_USER_FAIL,
  UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,CLEAR_ERROR,
  RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL} from "../constants/userconstants";


export const userreducer = (state = { user:{} }, action) => {
  switch (action.type) {

    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGOUT_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
        return{
          isAuthenticated:false,
          loading:true
        }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
        return{
          ...state,
          isAuthenticated:true,
          loading:false,
          user:action.payload
        }
    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_FAIL:
        return{
          ...state,
          error:action.payload
        }


    case LOAD_USER_FAIL:
        return{
          loading:false,
          isAuthenticated:false,
          user:null,
          error: action.payload
        }
    case LOGOUT_SUCCESS:
        return{
          loading:false,
          isAuthenticated:false,
          user:null
        }

    case LOGOUT_FAIL:
        return {
          ...state,
          error:action.payload
        }

    case REGISTER_FAIL:
    case LOGIN_FAIL:

        return{
          ...state,
          isAuthenticated:false,
          loading:false,
          user:null,
          error:action.payload
        }

      default:
        return state

  }
}

export const forgotpasswordreducer = (state = {},action) => {
    switch(action.type){
      case FORGOT_PASSWORD_REQUEST:
          return {
            ...state,
            loading: true,
            error:null
          }
      case FORGOT_PASSWORD_SUCCESS:
          return {
            ...state,
            loading: false,
            message:action.payload
          }
      case FORGOT_PASSWORD_FAIL:
          return {
            ...state,
            loading: false,
            error:action.payload
          }
      case CLEAR_ERROR:
          return {
            ...state,
            error:null
          }
      default:
        return state;
    }
}


export const resetpasswordreducer = (state = {}, action) => {
    switch(action.type){
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading:true,
          error:null
        }
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading:false,
          success:action.payload
        }
      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading:false,
          error:action.payload
        }
      case CLEAR_ERROR:
        return {
          ...state,
          error:null
        }
      default:
        return state;
    }
}
