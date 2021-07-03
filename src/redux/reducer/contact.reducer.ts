import Contacts from "../../model/contact";
import { ContactAction, TypeContactAction } from "../action/contact.action";

export type TypeContactReducer = {
    contactReducer: Contacts[]
}

const ContactReducer = (contactState: Contacts[] = [], action: TypeContactAction) => {
    switch (action.type) {
        case ContactAction.ADD_CONTACTS:
            return [...contactState, ...action.data];
            case ContactAction.UPDATE_CONTACT:
                const indexUpdated = contactState.findIndex(item => item.id == action.data.id);
                let updatedState = [...contactState];
                updatedState[indexUpdated] = action.data;
                return updatedState;
            case ContactAction.DELETE_CONTACT:
                const deletedState = contactState.filter(item => item.id != action.data.id);
                return deletedState;
            case ContactAction.RESET_CONTACT:
                return [];
        default:
            return contactState;
    }
}

export default ContactReducer