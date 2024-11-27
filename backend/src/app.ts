import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rideRoutes from "./routes/rideRoutes";

dotenv.config();

const app = express();

// Configuração de CORS
app.use(
  cors({
    origin: "*", // Qualquer origem
    methods: ["GET", "POST", "PATCH"], // Metodos permitidos
    allowedHeaders: ["Content-Type"], // Cabeçalhos permitidos
  })
);

app.use(express.json());

app.use("/ride", rideRoutes);

export default app;
