import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4000" });

api.interceptors.request.use((config) => {
  const stored = window.localStorage.getItem("loggedInUser") || '""';

  const storedUser = JSON.parse(stored);

  if (storedUser.token) {
    config.headers = {
      Authorization: `Bearer ${storedUser.token}`,
    };
  }

  return config;
});

export default api;
