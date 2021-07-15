import { takeLatest, call, put, take } from "redux-saga/effects";
import { AddContacts, ErrorFetchContacts, ContactAction, ResetContact,
     UpdateContactAction, DeleteContactAction, TypeContactAction } 
     from "../action/contact.action";

import { deleteContact, getContact, updateContact } from "../../service/contact";
import Contacts from "../../model/contact";
import Respons from "../../model/responses";

function* fetchContacts() {
    try {
        const contacts: Respons<Contacts[]> = yield call(getContact);
        yield put(AddContacts(contacts.data!));
    } catch(error) {
        yield put(ErrorFetchContacts(error));
    }
}

function* resetContacts() {
    try {
        yield put(ResetContact());
    } catch(error) {
        yield put(ErrorFetchContacts(error));
    }
}

function* updateContactsSaga(action: TypeContactAction) {
    try {
        const response: Respons<any> = yield call(updateContact, action.newData!)
        yield put(UpdateContactAction(action.newData!, response.message!));
    } catch(error) {
        yield put(ErrorFetchContacts(error));
    }
}

function* deleteContactSaga(action : TypeContactAction) {
    try {
        const response: Respons<any> = yield call(deleteContact, action.newData!)
        yield put(DeleteContactAction(action.newData!, response.message!))
    } catch(error) {
        yield put(ErrorFetchContacts(error));
    }
}

function* watchContacts() {
    yield takeLatest(ContactAction.FETCH_CONTACTS_TYPE, fetchContacts);
    yield takeLatest(ContactAction.RESET_CONTACT_TYPE, resetContacts);
    yield takeLatest(ContactAction.UPDATE_CONTACT_TYPE, action => updateContactsSaga(action));
    yield takeLatest(ContactAction.DELETE_CONTACT_TYPE, action => deleteContactSaga(action));
}

export default watchContacts;