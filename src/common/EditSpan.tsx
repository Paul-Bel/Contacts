import React, {useState} from "react";
import style from "../Components/Contacts/Contacts.module.css";

type EditSpanPropsType = {
    value: string
    name: string
    callBack: (value: string, name: string) => void
    setCgange: () => void
}

export const EditSpan = (props: EditSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const onCkickGange = () => {
        props.setCgange()
        setEditMode(false)
    }

    return (
        <div className={style.data}>
            <span className={style.infoName}>{props.name}</span>
            {!editMode ? <><span className={style.info}>{props.value}</span>
                    <span
                        onClick={() => setEditMode(!editMode)}
                        className={style.icon}>✍</span></>
                : <><input value={props.value} className={style.input}
                           onChange={(e) =>
                               props.callBack(e.currentTarget.value, props.name.toLocaleLowerCase())}/>
                    <span onClick={onCkickGange} className={style.icon}>✅</span></>}
        </div>

    )
}