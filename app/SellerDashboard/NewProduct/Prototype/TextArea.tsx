import React from 'react'

interface TextAreaProps {
    id: string;
    name: string;
    className: string;
}

export default function TextArea({id, name, className = ''}: TextAreaProps) {
  return <textarea name={name} id={id} className={className} required></textarea>
}
