import React from 'react'

interface InputProps {
    type?: string
    name?: string
    id?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    className?: string
    placeholder?: string
}

const Input = ({ type, name, id, onChange, className, placeholder }: InputProps) => {
    return <input type={type} name={name} id={id} onChange={onChange} className={className} placeholder={placeholder}/>
}

export default Input