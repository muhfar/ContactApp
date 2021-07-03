import { createStore, combineReducers } from "redux";
import ContactReducer from "../reducer/contact.reducer";

const Store = createStore(combineReducers({
    contactReducer: ContactReducer
}))

export default Store