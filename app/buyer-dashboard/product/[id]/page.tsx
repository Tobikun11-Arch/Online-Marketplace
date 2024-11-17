"use client"
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { AllProducts } from '../../axios/dataStore'

const Page = () => {
    const { id } = useParams()
    if(id) return <h2>{id}</h2>
    //Tommorrow fix the display of products just like this in the cine app
    // useEffect(() => {
    //     if (id) {
    //         fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d92de49cc045b7079ff263d81acb9db2`)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 setMovie(data);
    //                 setLoading(false);
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching movie details:', error);
    //                 setLoading(false); 
    //             });
    //     }

    // }, [id]);
    return (
        <div>
        
        </div>
    )
}

export default Page
