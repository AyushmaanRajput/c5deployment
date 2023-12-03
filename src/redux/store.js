import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as appReducer } from "./appReducer/reducer";
import { reducer as authReducer } from "./auth/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  appReducer: appReducer,
  authReducer: authReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
