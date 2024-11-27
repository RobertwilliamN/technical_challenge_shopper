"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rideController_1 = require("../controllers/rideController");
const router = (0, express_1.Router)();
// Rota de exemplo
router.post("/estimate", rideController_1.estimateRide);
router.patch("/confirm", rideController_1.confirmRide);
router.get("/:customer_id", rideController_1.getRidesByCustomer);
exports.default = router;
