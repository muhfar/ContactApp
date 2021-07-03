import Contacts, { ContactReq } from "../model/contact";

const validateFormContact = (item: ContactReq | Contacts) => {
    let msg = '';
    if (item) {
        if (item.firstName == '' || item.firstName == undefined) {
            msg='First name required';
        } else if (item.lastName == '' || item.lastName == undefined) {
            msg='Last name required';
        } else if (item.age <= 0 || item.age == undefined) {
            msg='Age must be more than 0';
        } else if (item.photo == '' || item.photo == undefined) {
            msg='Select an Image';
        }
    } else {
        msg='Please fill the form!';
    }
    return msg;
}

export default validateFormContact;