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
     editContacts(user: DataType) {
        return instance.put(`users/${user.id}`, {...user})
    },
    deleteContacts(id: string | number) {
        return instance.delete(`users/${id}`)
    },
    findContacts(id: string | number) {
        return instance.delete(`users?name=${id}`)
    },

}