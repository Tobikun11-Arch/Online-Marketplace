import React from 'react'

interface InputProps {
    type?: string;
    className?: string;

}

const Input = ({type, className}: InputProps) => {
    return (
        <input className={className} type={type} />
    )
}

export default Input
