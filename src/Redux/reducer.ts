import {Dispatch} from 'redux'
import {contactsAPI} from "../API/api";
const initialState: InitialStateType = {
    isLoggedIn: 'not authorized',
    load: false,
    successCreate: false,
    contacts: [],
}

export const reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGOUT_USER' :
            return {...state, contacts: [], isLoggedIn: "not authorized"};
        case 'AUTH_ME':
            return {...state, isLoggedIn: action.isLoggedIn};
        case 'PRELOAD':
            return {...state, load: action.load};
        case 'SET_CONTACTS':
            return {...state, contacts: action.contacts, successCreate: false};
        case 'CREATE_CONTACT':
            return {...state, contacts: [...state.contacts, action.contacts], successCreate: action.successCreate};
        case 'DELETE_CONTACT':
            return {...state, contacts: state.contacts.filter(us => us.id !== action.id), successCreate: false};
        case 'EDIT_CONTACT':
            return {...state, contacts: state.contacts.map(us => us.id === action.contacts.id ? action.contacts : us)};
        case 'Find_CONTACT':
            return {...state, contacts: state.contacts.filter(us => us.name.includes(action.name))}
        default:
            return state
    }
}

export const logoutAC = () => ({type: 'LOGOUT_USER'} as const)
export const authMeAC = (isLoggedIn: AuthType) => ({type: 'AUTH_ME', isLoggedIn} as const)
export const preloadAC = (load: boolean) => ({type: 'PRELOAD', load} as const)
export const setContactsAC = (users: DataType[]) => ({
    type: 'SET_CONTACTS',
    contacts: users,
    successCreate: false
} as const)
export const createContactsAC = (users: DataType) => ({
    type: 'CREATE_CONTACT',
    contacts: users,
    successCreate: true
} as const)
export const editContactsAC = (users: DataType) => ({type: 'EDIT_CONTACT', contacts: users} as const)
export const deleteContactsAC = (id: number | string) => ({type: 'DELETE_CONTACT', id} as const)
export const findContactsAC = (name: string) => ({type: 'Find_CONTACT', name} as const)

// // thunks
export const loginTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(preloadAC(true))
    contactsAPI.authMe()
        .then(res => {

            if (res.status === 200 && res.data[0].email === email && res.data[0].password === password) {
                dispatch(authMeAC('success'))
            } else {
                dispatch(authMeAC('invalid credentials'))
            }
        })
        .catch((error) => {
            console.log(error)
            alert('try later')
        }).finally(() => dispatch(preloadAC(false)))
}
export const setContactsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(preloadAC(true))
    contactsAPI.getContacts()
        .then(res => {
            if (res.status === 200) {
                dispatch(setContactsAC(res.data))
            }
        })
        .catch((error) => {
            console.log(error)
            alert('try later')
        }).finally(() => dispatch(preloadAC(false)))
}
export const createContactsTC = (newUser: DataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(preloadAC(true))
    contactsAPI.createContacts(newUser)
        .then(res => {
            if (res.status === 201) {
                dispatch(createContactsAC(res.data))
            }
        })
        .catch((error) => {
            console.log(error)
            alert('try later')
        }).finally(() => dispatch(preloadAC(false)))
}
export const editContactsTC = (editUser: DataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(preloadAC(true))
    contactsAPI.editContacts(editUser)
        .then(res => {
            if (res.status === 200) {
                dispatch(editContactsAC(editUser))
            }
        })
        .catch((error) => {
            console.log(error)
            alert('try later')
        }).finally(() => dispatch(preloadAC(false)))
}
export const deleteContactsTC = (id: number | string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(preloadAC(true))
    contactsAPI.deleteContacts(id)
        .then(res => {
            if (res.status === 200) {
                dispatch(deleteContactsAC(id))
            }
        })
        .catch((error) => {
            console.log(error)
            alert('try later')
        }).finally(() => dispatch(preloadAC(false)))
}


type ActionsType = ReturnType<typeof logoutAC> | ReturnType<typeof authMeAC>
    | ReturnType<typeof preloadAC> | ReturnType<typeof setContactsAC>
    | ReturnType<typeof createContactsAC> | ReturnType<typeof deleteContactsAC>
    | ReturnType<typeof editContactsAC> | ReturnType<typeof findContactsAC>

export type DataType = {
    id: string,
    name: string,
    city: string,
    phone: string,
    email: string
    photo: string
}
export type AuthType = 'not authorized' | 'invalid credentials' | 'success'
type InitialStateType = {
    isLoggedIn: AuthType
    load: boolean
    successCreate: boolean
    contacts: Array<DataType>
}