import React, {useEffect, useState} from "react";
import {Contact} from "./Contact";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/store";
import {AuthType, DataType, findContactsAC, setContactsTC} from "../../Redux/reducer";
import { Navigate } from "react-router-dom";
import style from './Contacts.module.css'
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

export const ContactContainer = () => {
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, Array<DataType>>(state => state.data.contacts)
    const isLoggedIn = useSelector<AppRootStateType, AuthType>(state => state.data.isLoggedIn)
    const [findContactName, setFindContactName] = useState('')
    useEffect(() => {
        if(!isLoggedIn) return
        dispatch(setContactsTC())
    },[])
    if(isLoggedIn !== "success"){return <Navigate to={'/login'}/>}

    let contacts = state
    if(findContactName.trim()){contacts = state.filter(us => us.name.toLocaleLowerCase().includes(findContactName))}
    return (
        <div className={style.contactModule}>
            <div style={{marginTop:'10px', width: '100%'}}>
                <TextField id="outlined-basic" label="type name" variant="outlined"
                       error={false}
                       value={findContactName}
                       onChange={(e)=>setFindContactName(e.currentTarget.value)}/>
                <Button style={{marginLeft:'10px', height: '56px'}} variant="outlined" startIcon={<DeleteIcon/>}
                        onClick={()=>setFindContactName('')}>
                    clean
                </Button>
            </div>
            {contacts.map(us => <Contact
                key={us.id}
                id={us.id}
                name={us.name}
                city={us.city}
                phone={us.phone}
                email={us.email}
                photo={us.photo}
            />)}
        </div>
    )
}