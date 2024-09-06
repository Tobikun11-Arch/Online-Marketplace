import React from 'react'

interface TextareaProps {
    placeholder: string;
    length: number;
    rows: number;
    value: string;
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function textArea({placeholder, length, rows, onChange, value, id, name, ...props}: TextareaProps) {
  return (
   <>
    <textarea id={id} {...props} name={name} value={value} onChange={onChange} maxLength={length} rows={rows} placeholder={placeholder} className='border-2 bg-white rounded-lg border-gray-400 outline-none mt-4 pl-2 resize-none w-96 h-52' required/>
   </>
  )
}