import { ArgFunction, SetStateType } from '@/types';
import React from 'react'
import styles from "./TextInput.module.css"
import { textInputSetState } from '@/utils/functions';
type Props = {
    type?: React.HTMLInputTypeAttribute;
    label?: string;
    placeholder?: string;
    value: string | number;
    setValue: SetStateType<string> | ArgFunction;
    containerStyle?: React.CSSProperties
    containerClassName?: string;
}
const TextInput = (props: Props) => {
    const {
        type = "text",
        label,
        placeholder,
        value,
        setValue,
        containerStyle,
        containerClassName
    } = props
    return (
        <div style={containerStyle} className={containerClassName}>
            <label htmlFor={label}>{label}</label><br />
            <input
                type={type}
                name={label}
                id={label}
                value={value}
                className={styles.input}
                placeholder={placeholder}
                onChange={(e) => textInputSetState(e, setValue)}
            />
        </div >
    )
}

export default TextInput