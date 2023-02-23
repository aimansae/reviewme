import axios from "axios";

//unique url from deployed api project

axios.defaults.baseURL = "https://drf-reviewme.herokuapp.com/";

// data format api expects, multiparts with images

axios.defaults.headers.post["Content-Type"] = "mutipart/form-data";

//to avoid CORS errors when sending cookies

axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
