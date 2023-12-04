import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as contactReducer } from "./contact/reducer";
import { reducer as appointmentReducer } from "./appointment/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  contactReducer: contactReducer,
  appointmentReducer: appointmentReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
