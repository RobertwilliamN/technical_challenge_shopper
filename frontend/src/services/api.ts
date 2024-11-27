import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // URL base do backend
  headers: {
    "Content-Type": "application/json", // Certifique-se de que o conteúdo é JSON
  },
});

export default api;
