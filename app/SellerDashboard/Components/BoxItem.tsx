import React from 'react'

interface Data {
    DataNumber: number;
    label: string;
}

export default function BoxItem({ DataNumber, label }: Data) {
  return (
    <div className='border-2 border-gray-200 w-40 h-24 bg-white flex flex-col justify-center items-center rounded-lg cursor-default'>
      <h1>{DataNumber}</h1>
      <p>{label}</p>
    </div>
  )
}
