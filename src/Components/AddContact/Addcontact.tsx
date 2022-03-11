import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import React, {ChangeEvent, useState} from "react";
import style from './Addcontact.module.css'
import {Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {v1} from "uuid";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/store";
import {createContactsTC, DataType} from "../../Redux/reducer";


export const Addcontact = () => {
    const dispatch = useDispatch()
    const resrt = {name: " ", city: "", phone: " ", email: "", photo: ""}
    const error = <span style={{color: 'red'}}>Fill in the field</span>
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.data.isLoggedIn)
    const [newContact, setNewContact] = useState<DataType>({id: v1(), ...resrt})

    const sendHandler = () => {
        if(!newContact.name.trim()){
            setNewContact({...newContact, name:''})
            return
        }
        let validatePhone = newContact.phone.toString()
        if(!validatePhone.trim()){
            setNewContact({...newContact, phone:''})
            return
        }
        dispatch(createContactsTC(newContact))
        setNewContact({id: v1(),...resrt})
    }
    if(!isLoggedIn){return <Navigate to={'/login'}/>}
    return (
        <div className={style.addContactContainer}>
            <div className={style.addStrings}> {!!newContact.name ?  "Enter name"  : error}
            <TextField id="outlined-basic" label="*name" variant="outlined"
                       error={!newContact.name}
                       value={newContact.name}
                       onChange={(e)=>setNewContact({...newContact, name: e.currentTarget.value})}/>
            </div>
            <div className={style.addStrings}> Enter city
            <TextField id="outlined-basic" label="city" variant="outlined"
                       value={newContact.city}
                       onChange={(e)=>setNewContact({...newContact, city: e.currentTarget.value})}/>
            </div>
            <div className={style.addStrings}> {!!newContact.phone ? "Enter phone" : error}
            <TextField id="outlined-basic" label="*(960)xxxxxxx" variant="outlined"
                       value={newContact.phone} error={!newContact.phone}
                       onChange={(e)=>setNewContact({...newContact, phone: isFinite(+e.currentTarget.value)?+e.currentTarget.value:newContact.phone})}/>
            </div>
            <div className={style.addStrings}> Enter email
            <TextField id="outlined-basic" label="e-mail" variant="outlined"
                       value={newContact.email}
                       onChange={(e)=>setNewContact({...newContact, email: e.currentTarget.value})}/>            </div>
            <div className={style.addStrings}> Add url photo
            <TextField id="outlined-basic" label="https://.....jpg" variant="outlined"
                       value={newContact.photo}
                       onChange={(e)=>setNewContact({...newContact, photo: e.currentTarget.value})}/>
            </div>
            <Stack direction="row" spacing={5} justifyContent={"center"}>
                <Button variant="outlined" color={'error'} startIcon={<DeleteIcon/>} onClick={()=>(setNewContact({id: v1(),...resrt}))}>
                    Cleande
                </Button>
                <Button variant="contained" endIcon={<SendIcon/>} onClick={sendHandler}
                onBlur={sendHandler}>
                    Send
                </Button>
            </Stack>

        </div>

    )
}
