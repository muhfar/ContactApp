import Contacts from "../../model/contact";

enum ContactAction {
    FETCH_CONTACTS_TYPE='FETCH_CONTACTS_TYPE',
    FETCH_CONTACTS_ERROR_TYPE='FETCH_CONTACTS_ERROR_TYPE',
    ADD_CONTACTS='ADD_CONTACTS',
    RESET_CONTACT_TYPE='RESET_CONTACT_TYPE',
    RESET_CONTACT_SUCCESS_TYPE='RESET_CONTACT_SUCCESS_TYPE',
    UPDATE_CONTACT_TYPE='UPDATE_CONTACT_TYPE',
    UPDATE_CONTACT_SUCCESS_TYPE='UPDATE_CONTACT_SUCCESS_TYPE',
    DELETE_CONTACT_TYPE='DELETE_CONTACT_TYPE',
    DELETE_CONTACT_SUCCESS_TYPE='DELETE_CONTACT_SUCCESS_TYPE'
}

export type TypeContactAction = {
    type: ContactAction,
    data?: Contacts | Contacts[] | [],
    newData?: Contacts,
    message?: string,
    error?: string
}

const FetchContacts = () : TypeContactAction => {
    return {
        type: ContactAction.FETCH_CONTACTS_TYPE,
    }
}

const AddContacts = (data: Contacts[]) : TypeContactAction => {
    return {
        type: ContactAction.ADD_CONTACTS,
        data: data
    }
}

const ErrorFetchContacts = (error: string) : TypeContactAction => {
    return {
        type: ContactAction.FETCH_CONTACTS_ERROR_TYPE,
        error: error
    }
}

const FetchResetContact = () : TypeContactAction => {
    return {
        type: ContactAction.RESET_CONTACT_TYPE,
    }
}

const ResetContact = () : TypeContactAction => {
    return {
        type: ContactAction.RESET_CONTACT_SUCCESS_TYPE,
        data: []
    }
}

const FetchUpdateContact = (data: Contacts) : TypeContactAction => {
    return {
        type: ContactAction.UPDATE_CONTACT_TYPE,
        newData: data
    }
}

const UpdateContactAction = (data: Contacts, message: string) : TypeContactAction => {
    return {
        type: ContactAction.UPDATE_CONTACT_SUCCESS_TYPE,
        newData: data,
        message
    }
}

const FetchDeleteContact = (data: Contacts) : TypeContactAction => {
    return {
        type: ContactAction.DELETE_CONTACT_TYPE,
        newData: data
    }
}

const DeleteContactAction = (data: Contacts, message: string) : TypeContactAction => {
    return {
        type: ContactAction.DELETE_CONTACT_SUCCESS_TYPE,
        newData: data,
        message
    }
}

export { ContactAction, AddContacts, FetchContacts, ErrorFetchContacts, 
    ResetContact, FetchResetContact, FetchUpdateContact, UpdateContactAction,
    FetchDeleteContact, DeleteContactAction
}