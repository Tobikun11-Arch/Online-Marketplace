import React from 'react'
import '../Responsive/AddProducts.css'

interface Data {
  DataNumber: number;
  label: string;
}

export default function BoxItem({ DataNumber, label }: Data) {
  return (
    <div className='border-2 border-gray-200 DisplayGrid py-4 px-24 bg-white flex flex-col justify-center items-center rounded-lg cursor-default ml-1 sm:py-8'>
    <h1>{DataNumber}</h1>
    <p>{label}</p>
    </div>
  )
}