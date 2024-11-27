"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const rideRoutes_1 = __importDefault(require("./routes/rideRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuração de CORS
app.use((0, cors_1.default)({
    // origin: "http://localhost:8082", // Substitua pela URL do seu frontend
    origin: "*",
    methods: ["GET", "POST", "PATCH"], // Métodos permitidos
    allowedHeaders: ["Content-Type"], // Cabeçalhos permitidos
}));
app.use(express_1.default.json());
app.use("/ride", rideRoutes_1.default);
exports.default = app;
