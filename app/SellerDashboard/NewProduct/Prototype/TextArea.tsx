import React from 'react'

interface TextAreaProps {
    id?: string;
    name?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({id, name, className = '', value, onChange}: TextAreaProps) {
  return <textarea name={name} id={id} className={className} value={value} onChange={onChange} required></textarea>
}
