import { Request, Response } from "express";
import { getRoute } from "../services/googleMapsService";
import { drivers } from "../data/drivers";
import { Database } from "sqlite";
import { initializeDatabase } from "../Database/db";
import { EstimateRideRequestBody, EstimateRideResponse } from "../types/rideTypes";
import { ConfirmRideRequestBody } from "../types/rideTypes";
import { saveRideToDatabase } from "../services/rideService";


// Função para estimular rota, valores e motoristas
export const estimateRide = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customer_id, origin, destination } = req.body as EstimateRideRequestBody;
  
      // Validação de entrada
      if (!customer_id || !origin || !destination) {
        res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Customer ID, origin, and destination are required.",
        });
        return;
      }
  
      if (origin.trim() === "" || destination.trim() === "") {
        res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Origin and destination cannot be empty.",
        });
        return;
      }
  
      if (origin === destination) {
        res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Origin and destination cannot be the same.",
        });
        return;
      }
  
      // Chamada à API do Google Maps para obter a rota
      const route = await getRoute(origin, destination);
  
      // Verificar a resposta do Google Maps
      // console.log("Google Maps route response:", route);
  
      // Verificar a estrutura da resposta antes de acessar
      if (!route || !route.routes || route.routes.length === 0 || !route.routes[0].legs || route.routes[0].legs.length === 0) {
        res.status(500).json({
          error_code: "INVALID_ROUTE_DATA",
          error_description: "Received an invalid or empty route response from Google Maps.",
        });
        return;
      }
  
      // Extrair detalhes da rota
      const leg = route.routes[0].legs[0];
      const distance = leg.distance.value / 1000; // Em metros
      const duration = leg.duration.text;
  
      // Filtrar motoristas e calcular custos
      const options = drivers.filter((driver) => distance >= driver.minKm)
        .map((driver) => ({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: driver.review,
          value: parseFloat((distance * driver.ratePerKm).toFixed(2)),
        }));
  
      // Estruturar a resposta
      const response: EstimateRideResponse = {
        origin: leg.start_address,
        destination: leg.end_address,
        distance,
        duration,
        options,
        routeResponse: route, // Aqui você pode continuar usando `route` como está
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error calculating route:", error);
      res.status(500).json({
        error_code: "ROUTE_CALCULATION_ERROR",
        // error_description: error.message || "Failed to calculate route. Please try again later.",
      });
    }
  };
  

// Função para confirmar a viagem
export const confirmRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customer_id, origin, destination, distance, duration, driver, value } = req.body as ConfirmRideRequestBody;

        console.log("Recebido: ", customer_id, origin, destination, distance, duration, driver, value)

        // **Validações**
        if (!customer_id || !origin || !destination || !distance || !duration || !driver || !value) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "All fields (customer_id, origin, destination, distance, duration, driver, value) are required.",
            });
            return;
        }

        if (origin.trim() === "" || destination.trim() === "") {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Origin and destination cannot be empty.",
            });
            return;
        }

        if (origin === destination) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Origin and destination cannot be the same.",
            });
            return;
        }

        const selectedDriver = drivers.find((d) => d.id === driver.id && d.name === driver.name);
        if (!selectedDriver) {
            res.status(404).json({
                error_code: "DRIVER_NOT_FOUND",
                error_description: "The driver provided does not exist.",
            });
            return;
        }

        if (distance < selectedDriver.minKm) {
            res.status(406).json({
                error_code: "INVALID_DISTANCE",
                error_description: `Distance must be between ${selectedDriver.minKm} km for the selected driver.`,
            });
            return;
        }

        // **Salvar no banco de dados**
        const date = new Date().toISOString(); // Usando toISOString para garantir que a data esteja no formato correto para o banco (ISO 8601)

        // **Salvar no banco de dados**
        const rideSaved = await saveRideToDatabase({
            customer_id,
            date, // Adicionando a data no objeto
            origin,
            destination,
            distance,
            duration,
            driver,
            value,
        });

        if (rideSaved) {
            res.status(200).json({ success: true });
        } else {
            res.status(500).json({
                error_code: "DATABASE_ERROR",
                error_description: "Failed to save the ride. Please try again later.",
            });
        }
    } catch (error) {
        console.error("Error confirming ride:", error);
        res.status(500).json({
            error_code: "SERVER_ERROR",
            error_description: "An unexpected error occurred. Please try again later.",
        });
    }
};


// Função para buscar as viagens realizadas pelo usuário
export const getRidesByCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customer_id } = req.params;
        const { driver_id } = req.query;
    
        // Verificação se o customer_id está presente
        if (!customer_id) {
             res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Customer ID cannot be empty.",
            });
        }

        // Inicializando o banco de dados
        const db: Database = await initializeDatabase();

        // Construindo a consulta base
        let query = "SELECT * FROM rides WHERE customer_id = ? ORDER BY date DESC";
        const params = [customer_id];

        // Se o driver_id for informado, verificamos se o motorista existe nos dados importados
        if (driver_id) {
            const driverIdStr = Array.isArray(driver_id) ? driver_id[0] : driver_id;
            const driverIdStrFinal = String(driverIdStr); // Garantindo que seja uma string

            // Verificando se o motorista existe nos dados importados
            const driverExists = drivers.find(driver => driver.id === parseInt(driverIdStrFinal));
            if (!driverExists) {
                 res.status(400).json({
                    error_code: "INVALID_DRIVER",
                    error_description: "Driver ID is invalid.",
                });
            }

            // Adicionando o filtro pelo driver_id à consulta
            query = "SELECT * FROM rides WHERE customer_id = ? AND driver_id = ? ORDER BY date DESC";
            params.push(driverIdStrFinal);
        }

        // Buscando as viagens no banco de dados
        const rides = await db.all(query, params);

        console.log(rides)

        // Caso não haja nenhuma viagem encontrada
        if (rides.length === 0) {
             res.status(404).json({
                error_code: "NO_RIDES_FOUND",
                error_description: "No rides found for this customer.",
            });
        }

        // Respondendo com a lista de viagens, incluindo o nome do motorista
        res.status(200).json({
            customer_id,
            rides: rides.map((ride) => ({
                id: ride.id,
                date: ride.created_at,
                origin: ride.origin,
                destination: ride.destination,
                distance: ride.distance,
                duration: ride.duration,
                driver: {
                    id: ride.driver_id,
                    name: drivers.find(driver => driver.id === ride.driver_id)?.name || "Unknown Driver", // Nome do motorista
                },
                value: ride.value,
            })),
        });
    } catch (error) {
        console.error("Error getting rides by customer:", error);
        // Retorno de erro genérico
        res.status(500).json({
            error_code: "SERVER_ERROR",
            error_description: "An unexpected error occurred. Please try again later.",
        });
    }
};