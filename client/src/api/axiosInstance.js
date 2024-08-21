import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-clone-yrnp.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;