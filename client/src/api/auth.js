import axios from "./axios";


export const RegisterRequest = user=> axios.post(`/login/createUser`, user)
 