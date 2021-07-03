import axios from '../axios/interceptor';
import Contacts, { ContactReq } from '../model/contact';
import Respons from '../model/responses';

const BASE_URL = 'https://simple-contact-crud.herokuapp.com/contact'

const getContact = async () => {
    try {
        const { data, status } = await axios.get<Respons<Contacts[]>>(BASE_URL)
        if (status == 200) return data
    } catch (error) {
        console.log(error.response.status)
        throw error.response.data.message
    }
}

const insertContact = async (body: ContactReq) => {
    try {
        const { data, status } = await axios.post<Respons<any>>(BASE_URL, body)
        if (status == 201) return data
    } catch (error) {
        throw error.response.data.message
    }
}

const updateContact = async (body: Contacts) => {
    try {
        const bodyReq: ContactReq = new ContactReq()
        bodyReq.firstName = body.firstName
        bodyReq.lastName = body.lastName
        bodyReq.age = body.age
        bodyReq.photo = body.photo
        console.log(bodyReq)
        const { data, status } = await axios.put<Respons<any>>(`${BASE_URL}/${body.id}`, bodyReq)
        if (status == 201) return data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}

const deleteContact = async (body: Contacts) => {
    try {
        const { data, status } = await axios.delete<Respons<any>>(`${BASE_URL}/${body.id}`)
        if (status == 200) return data
    } catch (error) {
        throw error.response.data.message
    }
}

export { getContact, insertContact, updateContact, deleteContact }