import axios from 'axios'

export const userData = axios.create({
    baseURL: process.env.Later
})