import React, {useState} from "react";
import style from "./Contacts.module.css"
import {DataType, deleteContactsAC, deleteContactsTC} from "../../Redux/reducer";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import {useDispatch} from "react-redux";


export const Contact = (props: DataType) => {
    const {id, name, city, phone, email, photo} = props
    const dispatch = useDispatch()
    let text = <div>"'На странице со списком контактов должна быть возможность:<p/>
        удалять <p/>
        редактировать <p/>
        наличие функции поиска.'"</div>
    const [forDelete, setForDlete] = useState(true)
    const deleteContact = () => {
        dispatch(deleteContactsTC(id))
    }
    return (
        <div className={style.container}>
            <div className={style.delete} >
                {forDelete
                    ? <span onClick={()=>setForDlete(false)}><DeleteForeverIcon fontSize="large" color={"primary"}/></span>
                    :<><span onClick={deleteContact}><DeleteSweepIcon fontSize={"large"}/></span>
                    <span onClick={()=>setForDlete(true)}><DoNotTouchIcon fontSize={"large"} style={{marginLeft:"10px"}}/></span></>}


            </div>

            <div className={style.photo} style={{backgroundImage: `url(${photo})`}}></div>
            <div className={style.infoContact}>
                <div className={style.dataContainer}></div>
                <h4>Contact</h4>
                <div className={style.data}>
                    <span className={style.infoName}>Name</span>
                    <span className={style.info}>`{name}`</span><span>✍</span>
                </div>
                <div className={style.data}><span>City</span><span className={style.info}>{city}</span>✍</div>
                <div className={style.data}><span>Phone</span><span className={style.info}>{phone}</span>✍</div>
                <div className={style.data}><span>Email</span><span className={style.info}>{email}</span>✍
                </div>
            </div>
        </div>
    )
}

function useConfirm(): { confirm: any; } {
    throw new Error("Function not implemented.");
}
