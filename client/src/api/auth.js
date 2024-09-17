import axios from "./axios";


export const RegisterRequest = user=> axios.post(`/register`, user)
 