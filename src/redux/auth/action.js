import axios from "axios";
import {
  GET_USERS_ERROR,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  POST_SIGNUP_ERROR,
  POST_SIGNUP_LOADING,
  POST_SIGNUP_SUCCESS,
} from "./actionTypes";

export const createUser = (userObj, toast, navigate) => async (dispatch) => {
  dispatch({ type: POST_SIGNUP_LOADING });
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users`,
      userObj
    );
    console.log(res);
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: POST_SIGNUP_SUCCESS });
    navigate("/login");
  } catch (err) {
    dispatch({ type: POST_SIGNUP_ERROR });
    toast({
      title: "Something went wrong",
      description: "Couldn't create your account",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
export const loginUser = (userObj, toast, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}/users`,
      userObj
    );
    console.log(res);
    let users = res.data;
    dispatch({ type: GET_USERS_SUCCESS, payload: users });
    // let flag = false;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email == userObj.email &&
        users[i].password == userObj.password
      ) {
        dispatch({ type: LOGIN_SUCCESS, payload: users[i] });
        console.log('action',users[i]);
        toast({
          title: "User Data Fetched Successfully",
          description: "We've created your account for you.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        localStorage.setItem("userId", users[i].id);
        navigate("/forum");
        return;
      } else {
        dispatch({ type: LOGIN_ERROR });
        toast({
          title: "Something went wrong",
          description: "Couldn't login into your account",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        navigate("/login");
      }
    }
  } catch (err) {
    dispatch({ type: LOGIN_ERROR });
    toast({
      title: "Something went wrong",
      description: "Couldn't login into your account",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
