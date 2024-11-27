import { Router } from "express";
import { estimateRide, confirmRide, getRidesByCustomer } from "../controllers/rideController";


const router = Router();

// Rota de exemplo
router.post("/estimate", estimateRide);
router.patch("/confirm", confirmRide);
router.get("/:customer_id", getRidesByCustomer);


export default router;
