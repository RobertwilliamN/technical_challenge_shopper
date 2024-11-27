import app from "./app";
import { initializeDatabase } from "./Database/db"; // Importando a função de inicialização do banco

const port = 8080;

const startServer = async () => {
    try {
        // Inicializando o banco de dados
        await initializeDatabase();
        console.log("Database initialized successfully.");

        // Iniciando o servidor após o banco de dados estar pronto
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${port}`);
          });
    } catch (error) {
        console.error("Error initializing the database:", error);
        process.exit(1); // Interrompe a aplicação se o banco não puder ser inicializado
    }
};

// Iniciando o servidor
startServer();
