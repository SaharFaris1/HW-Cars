import { Request, Response } from "express";
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status";
import { dealerStore } from "../store/CarDealer.store";
export const createCarDealer = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, email, city } = req.body;

        if (!name || !email || !city) {
            res.status(BAD_REQUEST).json({
                success: false,
                error: "all fields are required",
            });
            return;
        }

        const newDealer = dealerStore.create({ name, email, city });

        res.status(CREATED).json({
            success: true,
            data: newDealer,
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to create car dealer",
        });
    }
};

export const getAllCarDealers = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const dealers = dealerStore.findAll();
        res.status(OK).json({
            success: true,
            data: dealers,
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to get car dealers",
        });
    }
};

export const getDealerById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const dealer = dealerStore.findById(req.params.id);

        if (!dealer) {
            res.status(NOT_FOUND).json({
                success: false,
                error: "Dealer not found",
            });
            return;
        }

        res.status(OK).json({
            success: true,
            data: dealer,
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to get car dealer",
        });
    }
};

export const updateCarDealer = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, email, city } = req.body;
        const { id } = req.params;

        const existingDealer = dealerStore.findById(id);
        if (!existingDealer) {
            res.status(NOT_FOUND).json({
                success: false,
                error: "Dealer not found",
            });
            return;
        }

        const updatedDealer = dealerStore.update(id, { name, email, city });

        if (!updatedDealer) {
            res.status(BAD_REQUEST).json({
                success: false,
                error: "Failed to update car dealer",
            });
            return;
        }

        res.status(OK).json({
            success: true,
            data: updatedDealer,
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to update dealer",
        });
    }
};

export const deleteDealerById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        const deleted = dealerStore.delete(id);

        if (!deleted) {
            res.status(NOT_FOUND).json({
                success: false,
                error: "Failed to delete dealer  ",
            });
            return;
        }


        dealerStore.deleteByCarDealersId(id);

        res.status(OK).json({
            success: true,
            message: "Dealer deleted successfully",
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete car dealer",
        });
    }
};
