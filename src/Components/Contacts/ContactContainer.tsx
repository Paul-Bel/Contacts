import React, {useEffect, useState} from "react";
import {Contact} from "./Contact";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/store";
import {AuthType, DataType, setContactsTC} from "../../Redux/reducer";
import { Navigate } from "react-router-dom";
import style from './Contacts.module.css'

export const ContactContainer = () => {
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, Array<DataType>>(state => state.data.contacts)
    const isLoggedIn = useSelector<AppRootStateType, AuthType>(state => state.data.isLoggedIn)
    useEffect(() => {
        if(!isLoggedIn) return
        dispatch(setContactsTC())
    },[])
    if(isLoggedIn !== "success"){return <Navigate to={'/login'}/>}




    return (
        <div className={style.contactModule}>
            {state.map(us => <Contact
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