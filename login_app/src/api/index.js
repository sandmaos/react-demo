import axios from "../utils/request"
// import axios from "axios"

const base = {
    // baseUrl: "http://localhost:8080",
    baseUrl: "/api",
    register: "/api/register",
    findUser: "/api/find/username",
    login: "/api/login"
}

const api = {
    register(params) {
        return axios.post(base.baseUrl + base.register, params);
    },
    findUser(params) {
        return axios.get(base.baseUrl + base.findUser, { params });
    },
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    }
}

export default api;