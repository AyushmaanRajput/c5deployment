import {
  GET_FORUMS_LOADING,
  GET_FORUMS_ERROR,
  GET_FORUMS_SUCCESS,
  POST_FORUM_LOADING,
  POST_FORUM_ERROR,
  POST_FORUM_SUCCESS,
  PATCH_FORUM_LOADING,
  PATCH_FORUM_ERROR,
  PATCH_FORUM_SUCCESS,
  DELETE_FORUM_LOADING,
  DELETE_FORUM_ERROR,
  DELETE_FORUM_SUCCESS,
  SET_CURRENT,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  forums: [],
  currentForum: null,
  totalPages: 1,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_FORUMS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_FORUMS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_FORUMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        forums: action.payload[0],
        totalPages: action.payload[1],
      };
    case POST_FORUM_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POST_FORUM_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case POST_FORUM_SUCCESS:
      console.log(action.payload, "reducer");
      let newForumspost = [...state.forums].push(action.payload);
      console.log(newForumspost);
      return {
        ...state,
        isLoading: false,
        isError: false,
        currentForum: action.payload,
        forums: newForumspost,
      };
    case PATCH_FORUM_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case PATCH_FORUM_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case PATCH_FORUM_SUCCESS:
      let newForums = [...state.forums].map((forum) => {
        if (forum.id == action.payload.id) {
          return action.payload;
        }
        return forum;
      });
      return {
        ...state,
        isLoading: false,
        isError: false,
        currentForum: action.payload,
        forums: newForums,
      };
    case DELETE_FORUM_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case DELETE_FORUM_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case DELETE_FORUM_SUCCESS:
      let newForumsdelete = [...state.forums].filter(
        (forum) => forum.id != action.payload
      );
      console.log(newForumsdelete, "reducer");
      return {
        ...state,
        isLoading: false,
        isError: false,
        currentForum: null,
        forums: newForumsdelete,
      };

    case SET_CURRENT:
      return {
        ...state,
        currentForum: action.payload,
      };
    default:
      return state;
  }
};
