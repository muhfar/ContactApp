import Contacts from "../../model/contact";

enum ContactAction {
    ADD_CONTACTS='ADD_CONTACTS',
    UPDATE_CONTACT='UPDATE_CONTACT',
    RESET_CONTACT='RESET_CONTACT',
    DELETE_CONTACT='DELETE_CONTACT'
}

export type TypeContactAction = {
    type: ContactAction,
    data: Contacts | Contacts[] | []
}

const AddContacts = (data: Contacts[]) : TypeContactAction => {
    return {
        type: ContactAction.ADD_CONTACTS,
        data: data
    }
}

const ResetContact = () : TypeContactAction => {
    return {
        type: ContactAction.RESET_CONTACT,
        data: []
    }
}

const UpdateContact = (data: Contacts) : TypeContactAction => {
    return {
        type: ContactAction.UPDATE_CONTACT,
        data: data
    }
}

const DeleteContact = (data: Contacts) : TypeContactAction => {
    return {
        type: ContactAction.DELETE_CONTACT,
        data: data
    }
}

export { ContactAction, AddContacts, ResetContact, UpdateContact, DeleteContact }