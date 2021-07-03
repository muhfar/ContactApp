import Contacts, { ContactReq } from "../model/contact";

const validateFormContact = (item: ContactReq | Contacts) => {
    if (item.firstName == '' || item.lastName == '' || item.age == undefined || item.photo == '') {
        return false;
    } else {
        return true;
    }
}

export default validateFormContact;