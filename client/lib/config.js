import axios from "axios";

export const SERVER_BASE_URL = "http://localhost";
export const AXIOS = axios.create({
    baseURL: SERVER_BASE_URL
})