import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazonclone-5h9e.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;