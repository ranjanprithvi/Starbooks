import axios, { CanceledError } from "axios";

export default axios.create({
    params: {
        // key:"value"
    },
    headers: { "x-auth-token": localStorage.getItem("token") },
    baseURL: "http://localhost:3000/api",
});

export { CanceledError };
