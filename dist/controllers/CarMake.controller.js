"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarMake = exports.updateCarMake = exports.findById = exports.findAll = exports.createCarMaker = void 0;
const CarMake_model_1 = __importDefault(require("../models/CarMake.model"));
const http_status_1 = require("../utils/http-status");
const createCarMaker = async (req, res) => {
    try {
        const { id, country, brand } = req.body;
        if (!id || !country || !brand) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: "All fields are required",
            });
            return;
        }
        const CarMake = await CarMake_model_1.default.create({
            id,
            country,
            brand
        });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: CarMake,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to create car make",
        });
    }
};
exports.createCarMaker = createCarMaker;
const findAll = async (_req, res) => {
    try {
        const carMakers = await CarMake_model_1.default.find();
        res.status(http_status_1.OK).json({
            success: true,
            data: carMakers,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch car makes",
        });
    }
};
exports.findAll = findAll;
const findById = async (req, res) => {
    try {
        const carMake = await CarMake_model_1.default.findById(req.params.id);
        if (!carMake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: "Car make not found",
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: carMake,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch the car maker",
        });
    }
};
exports.findById = findById;
const updateCarMake = async (req, res) => {
    try {
        const updated = await CarMake_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            Validators: true
        });
        if (!updated) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: "Car make not found",
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to update list",
        });
    }
};
exports.updateCarMake = updateCarMake;
const deleteCarMake = async (req, res) => {
    try {
        const deleted = await CarMake_model_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: "Car make not found",
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            message: "Car make deleted successfully",
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete the car maker",
        });
    }
};
exports.deleteCarMake = deleteCarMake;
