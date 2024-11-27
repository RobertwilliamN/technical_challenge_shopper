import { initializeDatabase } from "../Database/db";
import { ConfirmRideRequestBody } from "../types/rideTypes";

export const saveRideToDatabase = async (ride: ConfirmRideRequestBody): Promise<boolean> => {
    try {
        const db = await initializeDatabase();

        // Inserir os dados no banco
        await db.run(
            `
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
            `,
            ride.customer_id,
            ride.origin,
            ride.destination,
            ride.distance,
            ride.duration,
            ride.driver.id,
            ride.driver.name,
            ride.value
        );

        return true; // Sucesso
    } catch (error) {
        console.error("Error saving ride to database:", error);
        return false; // Falha
    }
};
