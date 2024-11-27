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
exports.initializeDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
// Função para inicializar o banco de dados
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sqlite_1.open)({
        filename: "./rides.db",
        driver: sqlite3_1.default.Database,
    }).then((db) => __awaiter(void 0, void 0, void 0, function* () {
        // Criação da tabela se não existir
        yield db.exec(`
            CREATE TABLE IF NOT EXISTS rides (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id TEXT NOT NULL,
                origin TEXT NOT NULL,
                destination TEXT NOT NULL,
                distance REAL NOT NULL,
                duration TEXT NOT NULL,
                driver_id INTEGER NOT NULL,
                driver_name TEXT NOT NULL,
                value REAL NOT NULL,
                date DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
        return db;
    }));
});
exports.initializeDatabase = initializeDatabase;
