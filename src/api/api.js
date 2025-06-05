import axios from "axios"

const axios_api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default axios_api
