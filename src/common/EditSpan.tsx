import React, {useState} from "react";
import style from "../Components/Contacts/Contacts.module.css";

type EditSpanPropsType = {
    value: string
    name: string
    callBack: (value: string, name: string) => void
    setChange: () => void
}

export const EditSpan = (props: EditSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const onClickChange = () => {
        props.setChange()
        setEditMode(false)
    }
    return (
        <div className={style.data}>
            <span className={style.infoName}>{props.name}</span>
            {!editMode ? <><span className={style.info}
                                 onDoubleClick={() => setEditMode(!editMode)}>{props.value}
            </span>
                    <span
                        onClick={() => setEditMode(!editMode)}
                        className={style.icon}>✍</span></>
                : <><input value={props.value} className={style.input}
                           autoFocus={true}
                           onChange={(e) =>
                               props.name !== 'Phone' && e.currentTarget.value.length < 15
                               ? props.callBack(e.currentTarget.value, props.name.toLocaleLowerCase())
                               : e.currentTarget.value.length < 15 && props.callBack(isFinite(+e.currentTarget.value)
                                       ? e.currentTarget.value
                                       : props.value, props.name.toLocaleLowerCase())

                           }/>
                    <span onClick={onClickChange} className={style.icon}>✅</span></>}
        </div>
    )
}