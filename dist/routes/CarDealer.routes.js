"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CarDealer_controller_1 = require("../controllers/CarDealer.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/')
    .get(CarDealer_controller_1.getCarDealers)
    .post(CarDealer_controller_1.createCarDealer);
router.route('/:id')
    .get(CarDealer_controller_1.getCarDealerById)
    .put(CarDealer_controller_1.updateCarDealer)
    .delete(CarDealer_controller_1.deleteDealerById);
exports.default = router;
