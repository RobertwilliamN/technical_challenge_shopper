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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRideToDatabase = void 0;
const db_1 = require("../Database/db");
const saveRideToDatabase = (ride) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.initializeDatabase)();
        // Inserir os dados no banco
        yield db.run(`
            INSERT INTO rides (
                customer_id,
                origin,
                destination,
                distance,
                duration,
                driver_id,
                driver_name,
                value
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `, ride.customer_id, ride.origin, ride.destination, ride.distance, ride.duration, ride.driver.id, ride.driver.name, ride.value);
        return true; // Sucesso
    }
    catch (error) {
        console.error("Error saving ride to database:", error);
        return false; // Falha
    }
});
exports.saveRideToDatabase = saveRideToDatabase;
