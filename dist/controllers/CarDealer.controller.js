"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDealerById = exports.updateCarDealer = exports.getCarDealerById = exports.getCarDealers = exports.createCarDealer = void 0;
const CarDealer_model_1 = __importDefault(require("../models/CarDealer.model"));
const http_status_1 = require("../utils/http-status");
const createCarDealer = async (req, res) => {
    try {
        const { id, name, email, city } = req.body;
        if (!id || !name || !email || !city) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: "All fields are required",
            });
            return;
        }
        const newDealer = await CarDealer_model_1.default.create({
            id,
            name,
            email,
            city
        });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: newDealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create car dealer',
        });
    }
};
exports.createCarDealer = createCarDealer;
const getCarDealers = async (_req, res) => {
    try {
        const dealers = await CarDealer_model_1.default.find();
        res.status(http_status_1.OK).json({
            success: true,
            data: dealers,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch car dealers',
        });
    }
};
exports.getCarDealers = getCarDealers;
const getCarDealerById = async (req, res) => {
    try {
        const dealer = await CarDealer_model_1.default.findById(req.params.id);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car dealer not found',
            });
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch car dealer',
        });
    }
};
exports.getCarDealerById = getCarDealerById;
const updateCarDealer = async (req, res) => {
    try {
        const { name, email, city } = req.body;
        // ابحث  حسب ID ثم تحديثه
        const updated = await CarDealer_model_1.default.findByIdAndUpdate(req.params.id, {
            name,
            email,
            city
        }, {
            new: true, // يجعل الدالة ترجع القيمه بعد التحديث
            Validators: true // التحقق من صحة البيانات عند التحديث
        });
        if (!updated) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car dealer not found',
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
            error: error instanceof Error ? error.message : 'Failed to update dealer',
        });
    }
};
exports.updateCarDealer = updateCarDealer;
const deleteDealerById = async (req, res) => {
    try {
        const deleted = await CarDealer_model_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car dealer not found',
            });
        }
        res.status(http_status_1.OK).json({
            success: true,
            message: 'Dealer deleted successfully',
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete car dealer',
        });
    }
};
exports.deleteDealerById = deleteDealerById;
