import axios from "axios";

const axios_analytics = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axios_analytics.defaults.withCredentials = true;
axios_analytics.defaults.headers.post["Content-Type"] = "application/json";

export { axios_analytics };
