import {
  GET_USERS_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  POST_SIGNUP_ERROR,
  POST_SIGNUP_LOADING,
  POST_SIGNUP_SUCCESS,
  RESET,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  loggedInUser: null,
  allUsers: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case POST_SIGNUP_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POST_SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case POST_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
      };
    case LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        loggedInUser: action.payload,
      };
    case RESET:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: false,
        loggedInUser: null,
      };
    default:
      return state;
  }
};
