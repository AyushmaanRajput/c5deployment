import {
  GET_FORUMS_LOADING,
  GET_FORUMS_ERROR,
  GET_FORUMS_SUCCESS,
  POST_FORUM_LOADING,
  POST_FORUM_SUCCESS,
  POST_FORUM_ERROR,
  PATCH_FORUM_SUCCESS,
  PATCH_FORUM_ERROR,
  PATCH_FORUM_LOADING,
  DELETE_FORUM_SUCCESS,
} from "./actionTypes";
import axios from "axios";
export const getForums = (toast, params) => async (dispatch) => {
  dispatch({ type: GET_FORUMS_LOADING });
  try {
    console.log(params);
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/forum`, {
      params: params,
    });
    // console.log(res, res.headers.get("x-total-count"));
    const totalPages = Math.ceil(res.headers.get("x-total-count") / 5);
    console.log(res.headers.get("x-total-count"), totalPages, "From action");
    dispatch({ type: GET_FORUMS_SUCCESS, payload: [res.data, totalPages] });
  } catch (err) {
    dispatch({ type: GET_FORUMS_ERROR });
    toast({
      title: "Something went wrong",
      description: "Couldn't fetch forums",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};

export const postForum = (forumObj, toast, navigate) => async (dispatch) => {
  dispatch({ type: POST_FORUM_LOADING });
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/forum`,
      forumObj
    );
    console.log(res);
    toast({
      title: "Question Added Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: POST_FORUM_SUCCESS, payload: res.data });
    navigate("/answer");
  } catch (err) {
    dispatch({ type: POST_FORUM_ERROR });
    toast({
      title: "Something went wrong",
      description: "Couldn't add forum",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};

export const updateForum =
  (updatedForum, id, toast, type) => async (dispatch) => {
    dispatch({ type: PATCH_FORUM_LOADING });
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/forum/${id}`,
        updatedForum
      );
      console.log(res);
      if (!type) {
        toast({
          title: "Question Updated Successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: `${type} Updated Successfully`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
      dispatch({ type: PATCH_FORUM_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: PATCH_FORUM_ERROR });
      toast({
        title: "Something went wrong",
        description: "Couldn't update question",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

export const deleteForum = (id, toast) => async (dispatch) => {
  // dispatch({ type: DELETE_FORUM_LOADING });
  try {
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/forum/${id}`
    );
    console.log(res);
    toast({
      title: "Question Deleted Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_FORUM_SUCCESS, payload: id });
  } catch (err) {
    // dispatch({ type: DELETE_FORUM_ERROR });
    toast({
      title: "Something went wrong",
      description: "Couldn't delete question",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
