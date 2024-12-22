import axios from "axios";

const url = import.meta.env.VITE_API_BACKEND_URL;

const AxiosBase = axios.create({
    baseURL: url,
    withCredentials: true,
});

export default AxiosBase;
