import React from "react";
import style from "./Contacts.module.css"
import {DataType} from "../../Redux/reducer";

type ProfilePropsType = {
    id: number,
    name: string,
    city: string,
    phone: string,
    email: string,
    photo: string,
}

export const Contact = (props: DataType) => {
    const {id, name, city, phone, email, photo} = props

    let text = <div>"'На странице со списком контактов должна быть возможность:<p/>
        удалять <p/>
        редактировать <p/>
        наличие функции поиска.'"</div>
    return (
        <div className={style.container}>

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