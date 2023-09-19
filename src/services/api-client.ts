import axios, { CanceledError } from "axios";

export default axios.create({
    params: {
        // key:"value"
    },
    baseURL: "http://localhost:3000/api",
});

export { CanceledError };
