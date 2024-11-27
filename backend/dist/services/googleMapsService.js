"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoute = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
require('dotenv').config({ path: '../.env' });
const API_KEY = process.env.GOOGLE_API_KEY;
// Configuração para forçar o uso de IPv4 e maior timeout
const axiosInstance = axios_1.default.create({
    httpsAgent: new https_1.default.Agent({
        family: 4, // Forçar o uso de IPv4
    }),
    timeout: 10000, // Aumentar o timeout para 10 segundos
    headers: {
        "User-Agent": "GoogleMapsAPI-Request",
    },
});
const getRoute = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${API_KEY}`;
    try {
        const response = yield axiosInstance.get(url);
        // Verificar a resposta da API do Google Maps
        if (response.data.status !== "OK") {
            throw new Error(`Google Maps API error: ${response.data.error_message}`);
        }
        return response.data;
    }
    catch (error) {
        console.error("Error making request to Google Maps API:");
        if (error.code === "ENETUNREACH") {
            console.error("Network unreachable error. Check your internet connection or proxy settings.");
        }
        else if (error.response) {
            console.error("Error response from Google Maps API:", error.response.data);
        }
        else if (error.request) {
            console.error("No response received from Google Maps API:", error.request);
        }
        else {
            console.error("Unknown error:", error.message);
        }
        throw new Error("Failed to fetch route from Google Maps. Please check your network or try again later.");
    }
});
exports.getRoute = getRoute;
