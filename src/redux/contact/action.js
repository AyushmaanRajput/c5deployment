import {
  GET_CONTACTS_LOADING,
  GET_CONTACTS_ERROR,
  GET_CONTACTS_SUCCESS,
  POST_CONTACT_ERROR,
  POST_CONTACT_LOADING,
  POST_CONTACT_SUCCESS,
  PATCH_CONTACT_ERROR,
  PATCH_CONTACT_LOADING,
  PATCH_CONTACT_SUCCESS,
  DELETE_CONTACT_ERROR,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
} from "./actionTypes";

import axios from "axios";

export const getContacts = (params, toast) => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTACTS_LOADING });
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/contacts`, {
      params: params,
    });
    dispatch({
      type: GET_CONTACTS_SUCCESS,
      payload: { contacts: res.data.users, totalPages: +res.data.totalPages },
    });
    toast({
      title: "Welcome To The Website",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (err) {
    toast({
      title: "Something went wrong!",
      description: "Failed To Load Contacts",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: GET_CONTACTS_ERROR });
    console.log(err);
  }
};

export const postContact = (contact, toast, onClose) => async (dispatch) => {
  try {
    dispatch({ type: POST_CONTACT_LOADING });
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/contacts`,
      contact
    );
    dispatch({ type: POST_CONTACT_SUCCESS, payload: res.data.user });
    toast({
      title: "Contact Added Succesfully!",
      description: res.data.message,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    onClose();
  } catch (err) {
    toast({
      title: "Something went wrong!",
      description: "Failed To Add Contact",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: POST_CONTACT_ERROR });
    console.log(err);
    onClose();
  }
};

export const updateContact =
  (id, contact, toast, onClose) => async (dispatch) => {
    try {
      dispatch({ type: PATCH_CONTACT_LOADING });
      let res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/contacts/${id}`,
        contact
      );
      dispatch({
        type: PATCH_CONTACT_SUCCESS,
        payload: {
          id: id,
          user: res.data.user,
        },
      });
      toast({
        title: "Contact Updated Succesfully!",
        description: res.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      toast({
        title: "Something went wrong!",
        description: "Failed To Update Contact",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      dispatch({ type: PATCH_CONTACT_ERROR });
      console.log(err);
      onClose();
    }
  };

export const deleteContact = (id, toast) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONTACT_LOADING });
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/contacts/${id}`
    );
    dispatch({
      type: DELETE_CONTACT_SUCCESS,
      payload: id,
    });
    toast({
      title: "Contact Deleted Succesfully!",
      description: res.data.message,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (err) {
    toast({
      title: "Something went wrong!",
      description: "Failed To Delete Contact",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_CONTACT_ERROR });
    console.log(err);
  }
};
