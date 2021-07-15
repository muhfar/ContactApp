import { createStore, combineReducers, applyMiddleware } from "redux";
import ContactReducer from "../reducer/contact.reducer";

import createSagaMiddleware from "@redux-saga/core";
import watchContacts from "../saga/contact.saga";

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(combineReducers({
    contactReducer: ContactReducer
}), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchContacts);

export default Store