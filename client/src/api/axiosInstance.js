import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-clone-h0aw.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;