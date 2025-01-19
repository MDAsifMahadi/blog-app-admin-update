import axios from "axios";

const API = axios.create({
    baseURL : "https://server-n4i3.onrender.com",
    headers : {
        authorization :localStorage.getItem("token")
    }
});

export default API;