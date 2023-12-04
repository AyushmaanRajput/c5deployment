import {
  POST_SLOT_ERROR,
  POST_SLOT_LOADING,
  POST_SLOT_SUCCESS,
  GET_SLOT_ERROR,
  GET_SLOT_LOADING,
  GET_SLOT_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const bookSlot = (obj, toast) => async (dispatch) => {
  try {
    dispatch({ type: POST_SLOT_LOADING });
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/appointment`,
      obj
    );
    toast({
      title: "Slot Booked Succesfully!",
      description: res.data.message,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: POST_SLOT_SUCCESS });
  } catch (err) {
    dispatch({ type: POST_SLOT_ERROR });
    toast({
      title: "Couldn't Book Slot !",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};

export const getSlotsForDay = (date, toast) => async (dispatch) => {
  try {
    dispatch({ type: GET_SLOT_LOADING });
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}/appointment?date=${date}`
    );
    dispatch({
      type: GET_SLOT_SUCCESS,
      payload: res.data.slots,
    });
    toast({
      title: "Slots Found",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (err) {
    toast({
      title: "Something went wrong!",
      description: "Failed To Load slots",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: GET_SLOT_ERROR });
    console.log(err);
  }
};
