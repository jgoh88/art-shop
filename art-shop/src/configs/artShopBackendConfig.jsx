import axios from "axios";

const artShopBackendAxios = axios.create({
    baseURL: process.env.REACT_APP_ARTSHOP_BACKEND_URL
})

export default artShopBackendAxios