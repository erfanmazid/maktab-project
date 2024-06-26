import axios from "axios";

export const baseUrl = "http://localhost:3001";

axios.defaults.baseURL = baseUrl;
export default axios;
