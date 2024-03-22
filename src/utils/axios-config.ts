import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();

      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    } catch (error) {
      console.error("Erro ao configurar o token na requisição", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
