import {
  SELECT_CONTACT,
  POST_SLOT_ERROR,
  POST_SLOT_LOADING,
  POST_SLOT_SUCCESS,
  GET_SLOT_ERROR,
  GET_SLOT_LOADING,
  GET_SLOT_SUCCESS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  selectedContact: null,
  slots: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case SELECT_CONTACT:
      return {
        ...state,
        selectedContact: action.payload,
      };
    case POST_SLOT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case POST_SLOT_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POST_SLOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        slots: [...state.slots, action.payload],
      };
    case GET_SLOT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_SLOT_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_SLOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: true,
        slots: action.payload,
      };
    default:
      return state;
  }
};
