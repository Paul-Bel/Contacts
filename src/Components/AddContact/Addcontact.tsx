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

const mapInput = ['name', "city", 'phone', 'email', 'photo']
const reset = {name: " ", city: "", phone: " ", email: "", photo: ""}
export const Addcontact = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lastContact = useSelector<AppRootStateType, DataType>(store =>
        store.data.contacts[store.data.contacts.length - 1])
    const error = <span style={{color: 'red'}}>Fill in the field</span>
    const isLoggedIn = useSelector<AppRootStateType, AuthType>(state => state.data.isLoggedIn)
    const successCreate = useSelector<AppRootStateType, boolean>(state => state.data.successCreate)
    const load = useSelector<AppRootStateType, boolean>(state => state.data.load)
    const [newContact, setNewContact] = useState<DataType>({id: v1(), ...reset})
    useEffect(() => {
        let checkAuth = sessionStorage.getItem('auth')
        if (checkAuth === 'true') {
            dispatch(authMeAC('success'))
        } else {
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
        setNewContact({id: v1(), ...reset})
    }
    if (isLoggedIn !== "success") {
        navigate('/login')
    }
    return (
        <div className={style.addContactContainer}>
            <div className={style.header}>
                <h3>Create new contact</h3>
                {mapInput.map((name, i) => {
                    return <div className={style.addStrings} key={i + name}>
                        <div>
                            {(name !== 'name' && name !== 'phone') ? ("Enter " + name)
                                : (!!newContact[name as keyof DataType]) ? (<><>{"Enter " + name}
                                </>
                                    <span className={style.redStar}>*</span></>) : error}
                        </div>
                        <TextField id="outlined-basic" label={name} variant="outlined"
                                   value={newContact[name as keyof DataType]} className={style.input}
                                   onChange={(e) =>
                                       name !== 'phone' && e.currentTarget.value.length < 15
                                           ? setNewContact({...newContact, [name]: e.currentTarget.value})
                                           : e.currentTarget.value.length < 15 &&setNewContact({
                                               ...newContact,
                                               phone: isFinite(+e.currentTarget.value) ? e.currentTarget.value : newContact.phone
                                           })}
                        />
                    </div>
                })}
                <Stack direction="row" spacing={5} justifyContent={"center"}>
                    <Button variant="outlined" color={'error'} startIcon={<DeleteIcon/>}
                            onClick={() => (setNewContact({id: v1(), ...reset}))} disabled={load}>
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
