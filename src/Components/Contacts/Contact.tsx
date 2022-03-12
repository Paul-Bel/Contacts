import React, {useState} from "react";
import style from "./Contacts.module.css"
import {DataType, deleteContactsAC, deleteContactsTC, editContactsTC} from "../../Redux/reducer";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField/TextField";


export const Contact = (props: DataType) => {
    const {id, name, city, phone, email, photo} = props
    const dispatch = useDispatch()
    let text = <div>редактировать <p/>
        наличие функции поиска.'"</div>
    const [forDelete, setForDlete] = useState(true)
    const [editData, setEditData] =useState<DataType>({id, name, city, phone, email, photo})
    const [editMode, setEditMode] =useState({id: false, name: false, city: false, phone: false, email: false, photo: false})
    const deleteContact = () => {
        dispatch(deleteContactsTC(id))
    }
    const editDataContactHandler = () => {
        setEditMode({id: false, name: false, city: false, phone: false, email: false, photo: false})
        dispatch(editContactsTC(editData))
    }

    return (
        <div className={style.container}>

            <div className={style.delete} >
                {forDelete
                    ? <span onClick={()=>setForDlete(false)}><DeleteForeverIcon fontSize="large" color={"primary"}/></span>
                    :<><span onClick={deleteContact}><DeleteSweepIcon fontSize={"large"}/></span>
                    <span onClick={()=>setForDlete(true)}><DoNotTouchIcon fontSize={"large"} style={{marginLeft:"10px"}}/></span></>}


            </div>

            {!editMode.photo ? <div className={style.photo} style={{backgroundImage: `url(${photo})`}}
                                    onDoubleClick={()=>setEditMode({...editMode, photo: !editMode.photo})}/>
            : <><input value={editData.photo} style={{width:"80px"}} autoFocus={true}
                       onChange={(e)=>setEditData({...editData, photo: e.currentTarget.value})}/>
                    <span onClick={editDataContactHandler} style={{cursor:'pointer'}}>✅</span></>}
            <div className={style.infoContact}>
                {/*<div className={style.dataContainer}> </div>*/}
                <h4 style={{margin: '0'}}>Contact</h4>
                <div className={style.data}>
                    <span className={style.infoName}>Name</span>
                    {!editMode.name ? <><span className={style.info}>`{name}`</span><span onClick={()=>setEditMode({...editMode, name: !editMode.name})} style={{cursor:'pointer'}}>✍</span></>
                    :<><input value={editData.name} className={style.input}
                              onChange={(e)=>setEditData({...editData, name: e.currentTarget.value})}/>
                            <span onClick={editDataContactHandler} style={{cursor:'pointer'}}>✅</span></>}
                </div>
                <div className={style.data}>
                    <span className={style.infoName}>City</span>
                    {!editMode.city ? <><span className={style.info}>{city}</span><span onClick={()=>setEditMode({...editMode, city: !editMode.city})} style={{cursor:'pointer'}}>✍</span></>
                        : <><input value={editData.city} className={style.input}
                                   onChange={(e)=>setEditData({...editData, city: e.currentTarget.value})}/>
                            <span onClick={editDataContactHandler} style={{cursor:'pointer'}}>✅</span></>}
                </div>
                <div className={style.data}>
                    <span className={style.infoName}>Phone</span>
                    {!editMode.phone ? <><span className={style.info}>{phone}</span><span onClick={()=>setEditMode({...editMode, phone: !editMode.phone})} style={{cursor:'pointer'}}>✍</span></>
                        : <><input value={editData.phone} className={style.input}
                                   onChange={(e)=>setEditData({...editData, phone: isFinite(+e.currentTarget.value)?+e.currentTarget.value:editData.phone})}/>
                            <span onClick={editDataContactHandler} style={{cursor:'pointer'}}>✅</span></>}
                </div>
                <div className={style.data}>
                    <span className={style.infoName}>Email</span>
                    {!editMode.email ? <><span className={style.info}>{email}</span><span onClick={()=>setEditMode({...editMode, email: !editMode.email})} style={{cursor:'pointer'}}>✍</span></>
                    : <><input value={editData.email} className={style.input}
                             onChange={(e)=>setEditData({...editData, email: e.currentTarget.value})}/>
                            <span onClick={editDataContactHandler} style={{cursor:'pointer'}}>✅</span></>}

                </div>
            </div>
        </div>
    )
}

