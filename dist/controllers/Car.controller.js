"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCarById = exports.getAllCars = exports.createCar = void 0;
const Car_model_1 = __importDefault(require("../models/Car.model"));
const CarDealer_model_1 = __importDefault(require("../models/CarDealer.model"));
const CarMake_model_1 = __importDefault(require("../models/CarMake.model"));
const http_status_1 = require("../utils/http-status");
const createCar = async (req, res) => {
    try {
        const { dealerId, carMakeId, name, price, year, color, wheelsCount } = req.body;
        if (!dealerId || !carMakeId || !name || !price || !year || !color || !wheelsCount) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'All fields are required',
            });
        }
        const dealer = await CarDealer_model_1.default.findById(dealerId);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: ' Dealer not found ',
            });
            return;
        }
        const make = await CarMake_model_1.default.findById(carMakeId);
        if (!make) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car make not found',
            });
            return;
        }
        const newCar = await Car_model_1.default.create({
            dealerId,
            carMakeId,
            name,
            price,
            year,
            color,
            wheelsCount
        });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: newCar,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create car',
        });
    }
};
exports.createCar = createCar;
const getAllCars = async (_req, res) => {
    try {
        const cars = await Car_model_1.default.find();
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get cars',
        });
    }
};
exports.getAllCars = getAllCars;
const getCarById = async (req, res) => {
    try {
        const car = await Car_model_1.default.findById(req.params.id);
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get car',
        });
    }
};
exports.getCarById = getCarById;
const updateCar = async (req, res) => {
    try {
        const { dealerId, carMakeId, name, price, year, color, wheelsCount } = req.body;
        const updated = await Car_model_1.default.findByIdAndUpdate(req.params.id, { dealerId,
            carMakeId,
            name, price,
            year,
            color,
            wheelsCount
        }, {
            new: true,
            runValidators: true
        });
        if (!updated) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update car',
        });
    }
};
exports.updateCar = updateCar;
const deleteCar = async (req, res) => {
    try {
        const deleteCar = await Car_model_1.default.findById(req.params.id);
        if (!deleteCar) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
        }
        res.status(http_status_1.OK).json({
            success: true,
            message: 'Car deleted successfully',
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete car',
        });
    }
};
exports.deleteCar = deleteCar;
