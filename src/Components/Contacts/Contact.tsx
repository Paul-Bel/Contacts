import React, {useState} from "react";
import style from "./Contacts.module.css"
import {DataType, deleteContactsTC, editContactsTC} from "../../Redux/reducer";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import {useDispatch} from "react-redux";
import {EditSpan} from "../../common/EditSpan";

export const Contact = (props: DataType) => {
    const {id, name, city, phone, email, photo} = props
    const mapContact = [ 'Name', "City", 'Phone', 'Email']
    const dispatch = useDispatch()
    let text = <div>редактировать <p/>
        наличие функции поиска.'"</div>
    const [forDelete, setForDelete] = useState(true)
    const [editData, setEditData] = useState<DataType>({id, name, city, phone, email, photo})
    const [editMode, setEditMode] = useState(true)
    const changeDataContact = (value: string, idName: string) => {
        setEditData({...editData, [idName]: value})
    }
    const deleteContact = () => {
        dispatch(deleteContactsTC(id))
    }
    const editDataContactHandler = () => {
        let data = JSON.stringify(editData)
        let dataProps = JSON.stringify(props)
        data !== dataProps &&
        dispatch(editContactsTC(editData))
        setEditMode(true)
    }
    return (
        <div className={style.container}>
            <div className={style.delete}>
                {forDelete
                    ? <span className={style.icon} onClick={() => setForDelete(false)}>
                        <DeleteForeverIcon fontSize="large" color={"primary"}/></span>
                    : <><span onClick={deleteContact}><DeleteSweepIcon fontSize={"large"}/></span>
                        <span className={style.icon}
                              onClick={() => setForDelete(true)}>
                            <DoNotTouchIcon fontSize={"large"} style={{marginLeft: "10px"}}/></span></>}
            </div>
            {editMode ? <div className={style.photo} style={{backgroundImage: `url(${photo})`}}
                                    onClick={() => setEditMode(false)}/>
                : <><input value={editData.photo} style={{width: "80px"}} autoFocus={true}
                           onChange={(e) => setEditData({...editData, photo: e.currentTarget.value})}/>
                    <span onClick={editDataContactHandler} className={style.icon}>✅</span></>}
            <div className={style.infoContact}>
                {/*<div className={style.dataContainer}> </div>*/}
                <h4 style={{margin: '0'}}>Contact</h4>
                {mapContact.map((data, i) => {
                    return <EditSpan key={i+data} value={editData[data.toLowerCase() as keyof DataType]}
                                     name={data} callBack={changeDataContact} setChange={editDataContactHandler}/>
                })}
            </div>
        </div>
    )
}

