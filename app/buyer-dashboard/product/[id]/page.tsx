"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const { id } = useParams()
    if(id) return <h1>Id exist</h1>

    return (
        <div>
        
        </div>
    )
}

export default page
