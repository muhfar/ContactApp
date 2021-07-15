import Contacts from "../../model/contact";
import { ContactAction, TypeContactAction } from "../action/contact.action";

export type TypeState = {
    loading: boolean,
    data:Contacts[],
    newData?: ContactAction,
    message?: string,
    error?: string
}

const initState: TypeState = {
    loading: false,
    data: [],
    newData: undefined,
    message: undefined,
    error: undefined
}

export type TypeContactReducer = {
    contactReducer: TypeState
}

const ContactReducer = (contactState= initState, action: TypeContactAction) => {
    switch (action.type) {
        case ContactAction.FETCH_CONTACTS_TYPE:
        case ContactAction.RESET_CONTACT_TYPE:
        case ContactAction.UPDATE_CONTACT_TYPE:
        case ContactAction.DELETE_CONTACT_TYPE:
            return {
                ...contactState, loading: true, error: undefined, message: undefined
            }
        case ContactAction.ADD_CONTACTS:
            return {
                ...contactState, data: action.data, loading: false, error: undefined, message: undefined
            }
        case ContactAction.FETCH_CONTACTS_ERROR_TYPE:
            return {
                ...contactState, loading: false, error: action.error, message: undefined
            }
        case ContactAction.RESET_CONTACT_SUCCESS_TYPE:
            return {
                ...contactState, loading: false, data: action.data, error: undefined, message: undefined
            }
        case ContactAction.UPDATE_CONTACT_SUCCESS_TYPE:
            const indexUpdated = contactState.data.findIndex(item => item.id == action.newData?.id);
            let updatedData = [...contactState.data];
            updatedData[indexUpdated] = action.newData!;
            return {
                ...contactState, loading: false, data:updatedData, error: undefined, message: action.message
            }
        case ContactAction.DELETE_CONTACT_SUCCESS_TYPE:
            const deletedData = contactState.data.filter(item => item.id != action.newData?.id);
            return {
                ...contactState, loading: false, data: deletedData, error: undefined, message: action.message
            }
        default:
            return contactState;
    }
}

export default ContactReducer