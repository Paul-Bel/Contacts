import axios from "axios";
import {DataType} from "../Redux/reducer";

const instance = axios.create({
    baseURL: 'https://data-server-contacts.herokuapp.com/',

})

export const contactsAPI = {
    authMe() {
        return instance.get('auth');
    },
    getContacts() {
        return instance.get(`users`)
    },
    createContacts(newUser: DataType) {
        return instance.post(`users`, {...newUser})
    },
     editContacts(id: string|number, newUser: DataType) {
        return instance.put(`users/${id}`, {...newUser})
    },
    deleteContacts(id: string | number) {
        return instance.delete(`users/${id}`)
    },

}