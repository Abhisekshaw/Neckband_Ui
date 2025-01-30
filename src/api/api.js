import axios from "axios";

export const api = axios.create({ baseURL: process.env.REACT_APP_API });

//Registration Page API
export const REGISTER = (data) => api.post("/api/auth/register", data);

//Login Page API
export const LOGIN = (data) => api.post("/api/auth/login", data);

//Device Data
export const ADDDEVICE = (data, header) => api.post("/api/device/add", data, header);
export const GETDEVICE = (data, header) => api.post("/api/device/get", data, header);
export const DEVICEANDANIMAL = (data, header) => api.post("/api/device/deviceandanimal", data, header);
