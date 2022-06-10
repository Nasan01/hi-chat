import axios  from "axios";

const apiFetch = axios.create({
  baseURL: "http://0.0.0.0:5000",
})

export default apiFetch