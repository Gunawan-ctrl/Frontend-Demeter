import { boot } from "quasar/wrappers";
import axios from "axios";

// const baseURL = "http://127.0.0.1:5000/";
const baseURL = "http://192.168.18.36:5034/";
// const baseURL = "http://localhost:5034/";

const api = axios.create({ baseURL: baseURL });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;
});

export { api, baseURL };
