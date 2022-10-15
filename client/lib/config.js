import axios from "axios";

export const SERVER_BASE_URL = "/api";
export const AXIOS = axios.create({
    baseURL: SERVER_BASE_URL
})