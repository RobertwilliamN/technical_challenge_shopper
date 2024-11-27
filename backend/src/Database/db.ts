import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Função para inicializar o banco de dados
export const initializeDatabase = async (): Promise<Database> => {
    return open({
        filename: "./rides.db",
        driver: sqlite3.Database,
    }).then(async (db) => {
        // Criação da tabela se não existir
        await db.exec(`
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
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        return db;
    });
};
