import React, {useEffect, useState} from "react";
import {Contact} from "./Contact";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/store";
import {authMeAC, AuthType, DataType, setContactsTC} from "../../Redux/reducer";
import {useNavigate} from "react-router-dom";
import style from './Contacts.module.css'
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export const ContactContainer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = useSelector<AppRootStateType, Array<DataType>>(state => state.data.contacts)
    const isLoggedIn = useSelector<AppRootStateType, AuthType>(state => state.data.isLoggedIn)
    const [findContactName, setFindContactName] = useState('')
    useEffect(() => {
        let checkAuth = sessionStorage.getItem('auth')
        if (checkAuth === 'true') {
            dispatch(authMeAC('success'))
        }
        if (isLoggedIn !== "success") {
            navigate('/login')
        }
        if (isLoggedIn === 'success') {
            sessionStorage.setItem('auth', JSON.stringify(true))
            dispatch(setContactsTC())
        }
    }, [])
    const contacts = state.filter(us => us.name.toLowerCase().includes(findContactName.toLowerCase()))
    return (
        <div className={style.contactModule}>
            <div className={style.firstBlock}>
                <TextField id="outlined-basic" label="find name" variant="outlined"
                           error={false}
                           value={findContactName}
                           onChange={(e) =>
                               setFindContactName(e.currentTarget.value)}/>
                <Button style={{marginLeft: '10px', height: '56px'}}
                        disabled={!findContactName}
                        variant="outlined" startIcon={<DeleteIcon/>}
                        onClick={() => setFindContactName('')}>
                    clean
                </Button>
            </div>
            {contacts.map((us) => <Contact
                key={us.id} id={us.id} name={us.name} city={us.city}
                phone={us.phone} email={us.email} photo={us.photo}
            />)}
        </div>
    )
}
