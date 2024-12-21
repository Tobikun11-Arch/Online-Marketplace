import React from 'react'

interface InputProps {
    type?: string
    name?: string
    id?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    className?: string
    placeholder?: string
    value?: string
    KeyEnter?: React.KeyboardEventHandler<HTMLInputElement> | undefined
}

const Input = ({ type, name, id, onChange, className, placeholder, value, KeyEnter }: InputProps) => {
    return <input value={value} type={type} onKeyDown={KeyEnter} name={name} id={id} onChange={onChange} className={className} placeholder={placeholder}/>
}

export default Input