import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import React, {useEffect, useState} from "react";
import style from './Addcontact.module.css'
import {Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {v1} from "uuid";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/store";
import {authMeAC, AuthType, createContactsTC, DataType} from "../../Redux/reducer";
import {Contact} from "../Contacts/Contact";


export const Addcontact = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lastContact = useSelector<AppRootStateType, DataType>(store =>
        store.data.contacts[store.data.contacts.length - 1])
    const resrt = {name: " ", city: "", phone: " ", email: "", photo: ""}
    const error = <span style={{color: 'red'}}>Fill in the field</span>
    const isLoggedIn = useSelector<AppRootStateType, AuthType>(state => state.data.isLoggedIn)
    const successCreate = useSelector<AppRootStateType, boolean>(state => state.data.successCreate)
    const load = useSelector<AppRootStateType, boolean>(state => state.data.load)
    const [newContact, setNewContact] = useState<DataType>({id: v1(), ...resrt})
    useEffect(() => {
        let checkAuth = sessionStorage.getItem('auth')
        if (checkAuth === 'true') {
            dispatch(authMeAC('success'))
        }
        if (isLoggedIn !== "success") {
            navigate('/login')
        }
    }, [])
    const sendHandler = () => {
        if (!newContact.name.trim()) {
            setNewContact({...newContact, name: '', phone: ''})
            return
        }
        let validatePhone = newContact.phone.toString()
        if (!validatePhone.trim()) {
            setNewContact({...newContact, phone: ''})
            return
        }
        dispatch(createContactsTC(newContact))
        setNewContact({id: v1(), ...resrt})
    }

    return (
        <div className={style.addContactContainer}>
            <div className={style.header}>
                <h3>Create new contact</h3>
                <div className={style.addStrings}> {!!newContact.name ? "*Enter name" : error}
                    <TextField id="outlined-basic" label="*name" variant="outlined"
                               error={!newContact.name} value={newContact.name} className={style.input}
                               onChange={(e) => setNewContact({...newContact, name: e.currentTarget.value})}/>
                </div>
                <div className={style.addStrings}> Enter city
                    <TextField id="outlined-basic" label="city" variant="outlined"
                               value={newContact.city} className={style.input}
                               onChange={(e) => setNewContact({...newContact, city: e.currentTarget.value})}/>
                </div>
                <div className={style.addStrings}> {!!newContact.phone ? "*Enter phone" : error}
                    <TextField id="outlined-basic" label="*(960)xxxxxxx" variant="outlined"
                               value={newContact.phone} error={!newContact.phone} className={style.input}
                               onChange={(e) => setNewContact({
                                   ...newContact,
                                   phone: isFinite(+e.currentTarget.value) ? e.currentTarget.value : newContact.phone
                               })}/>
                </div>
                <div className={style.addStrings}> Enter email
                    <TextField id="outlined-basic" label="e-mail" variant="outlined"
                               value={newContact.email} className={style.input}
                               onChange={(e) => setNewContact({...newContact, email: e.currentTarget.value})}/></div>
                <div className={style.addStrings}> Add url photo
                    <TextField id="outlined-basic" label="https://.....jpg" variant="outlined"
                               value={newContact.photo} className={style.input}
                               onChange={(e) => setNewContact({...newContact, photo: e.currentTarget.value})}/>
                </div>
                <Stack direction="row" spacing={5} justifyContent={"center"}>
                    <Button variant="outlined" color={'error'} startIcon={<DeleteIcon/>}
                            onClick={() => (setNewContact({id: v1(), ...resrt}))} disabled={load}>
                        Clean
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon/>} onClick={sendHandler}
                            onBlur={sendHandler} disabled={load || (!newContact.name || !newContact.phone)}>
                        Send
                    </Button>
                </Stack>
                {successCreate && <><h4 style={{color: "green"}}>Contact created
                </h4> <Contact id={lastContact.id}
                               name={lastContact.name}
                               city={lastContact.city}
                               phone={lastContact.phone}
                               email={lastContact.email}
                               photo={lastContact.photo}/></>}
            </div>
        </div>

    )
}
