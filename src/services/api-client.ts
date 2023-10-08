import axios, { CanceledError } from "axios";

export default axios.create({
    params: {
        // key:"value"
    },
    headers: { "x-auth-token": localStorage.getItem("token") },
    baseURL: "https://starbooks-backend.onrender.com/api",
});

export { CanceledError };
