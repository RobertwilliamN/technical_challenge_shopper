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
const app_1 = __importDefault(require("./app"));
const db_1 = require("./Database/db"); // Importando a função de inicialização do banco
const port = 8080;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Inicializando o banco de dados
        yield (0, db_1.initializeDatabase)();
        console.log("Database initialized successfully.");
        // Iniciando o servidor após o banco de dados estar pronto
        app_1.default.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Error initializing the database:", error);
        process.exit(1); // Interrompe a aplicação se o banco não puder ser inicializado
    }
});
// Iniciando o servidor
startServer();
