"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CarMake_controller_1 = require("../controllers/CarMake.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(CarMake_controller_1.findAll)
    .post(CarMake_controller_1.createCarMaker);
router.route('/:id')
    .get(CarMake_controller_1.findById)
    .put(CarMake_controller_1.updateCarMake)
    .delete(CarMake_controller_1.deleteCarMake);
exports.default = router;
