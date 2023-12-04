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

const initState = {
  isLoading: false,
  isError: false,
  contacts: [],
  totalPages: null,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CONTACTS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_CONTACTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        contacts: action.payload.contacts,
        totalPages: action.payload.totalPages,
      };
    case POST_CONTACT_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POST_CONTACT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case POST_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        contacts: [...state.contacts, action.payload],
      };
    case PATCH_CONTACT_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case PATCH_CONTACT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case PATCH_CONTACT_SUCCESS:
      let newContacts = [...state.contacts].map((el) => {
        if (el._id == action.payload.id) {
          return action.payload.user;
        }
        return el;
      });
      return {
        ...state,
        isLoading: false,
        isError: false,
        contacts: newContacts,
      };
    case DELETE_CONTACT_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case DELETE_CONTACT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case DELETE_CONTACT_SUCCESS:
      let newContacts2 = [...state.contacts].filter(
        (el) => el._id != action.payload
      );
      return {
        ...state,
        isLoading: false,
        isError: false,
        contacts: newContacts2,
      };
    default:
      return state;
  }
};
