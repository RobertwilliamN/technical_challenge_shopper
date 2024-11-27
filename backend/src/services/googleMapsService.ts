import axios from "axios";
import https from "https";
require('dotenv').config({ path: '../.env' });


const API_KEY = process.env.GOOGLE_API_KEY;

// Configuração para forçar o uso de IPv4 e maior timeout
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    family: 4, // Forçar o uso de IPv4
  }),
  timeout: 10000, // Aumentar o timeout para 10 segundos
  headers: {
    "User-Agent": "GoogleMapsAPI-Request",
  },
});

export const getRoute = async (origin: string, destination: string) => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${API_KEY}`;

  try {
    const response = await axiosInstance.get(url);

    // Verificar a resposta da API do Google Maps
    if (response.data.status !== "OK") {
      throw new Error(`Google Maps API error: ${response.data.error_message}`);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error making request to Google Maps API:");

    if (error.code === "ENETUNREACH") {
      console.error("Network unreachable error. Check your internet connection or proxy settings.");
    } else if (error.response) {
      console.error("Error response from Google Maps API:", error.response.data);
    } else if (error.request) {
      console.error("No response received from Google Maps API:", error.request);
    } else {
      console.error("Unknown error:", error.message);
    }

    throw new Error("Failed to fetch route from Google Maps. Please check your network or try again later.");
  }
};
