import React, {useEffect, useState} from "react";
import {Contact} from "./Contact";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/store";
import {AuthType, DataType, setContactsTC} from "../../Redux/reducer";
import {Navigate, useNavigate} from "react-router-dom";
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
        if (isLoggedIn !== "success") {
            navigate('/login')
        }
        dispatch(setContactsTC())
        // if(isLoggedIn === 'success') {
        //     sessionStorage.setItem('auth', JSON.stringify(true))
        // }
    }, [])
    console.log('Test Streeng', 'R'==='R')
    // if (isLoggedIn !== "success") {
    //     return <Navigate to={'/login'}/>
    // }

    const contacts = state.filter(us => us.name.toLowerCase().includes(findContactName.toLowerCase()))

    return (
        <div className={style.contactModule}>
            <div style={{marginTop: '10px', width: '100%'}}>
                <TextField id="outlined-basic" label="type name" variant="outlined"
                           error={false}
                           value={findContactName}
                           onChange={(e) => setFindContactName(e.currentTarget.value)}/>
                <Button style={{marginLeft: '10px', height: '56px'}} variant="outlined" startIcon={<DeleteIcon/>}
                        onClick={() => setFindContactName('')}>
                    clean
                </Button>
            </div>
            {/*console.log(Object.keys(d)[id])*/}
            {/*console.log(Object.values(d)[id])*/}
            {contacts.map((us, i) => <Contact
                key={us.id} id={us.id} name={us.name} city={us.city}
                phone={us.phone} email={us.email} photo={us.photo}
                // nameTitle={Object.keys(us)[i]} cityTitle={Object.keys(us)[i]}
                // phoneTitle={Object.keys(us)[i]} emailTitle={Object.keys(us)[i]}
            />)}
        </div>
    )
}