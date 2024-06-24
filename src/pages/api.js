import axios from "axios";

export const baseUrl = "http://localhost:3000";

axios.defaults.baseURL = baseUrl;
export default axios;
