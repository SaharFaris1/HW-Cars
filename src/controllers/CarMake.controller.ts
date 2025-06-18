import { Request, Response } from "express";
import CarMakeModel from "../models/CarMake.model";
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status";


export const createCarMaker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, country, brand } = req.body;

    if (!id || !country || !brand) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "All fields are required",
      });
      return;
    }

    const CarMake = await CarMakeModel.create({ 
      id, 
      country, 
      brand
     });
    res.status(CREATED).json({
      success: true,
      data: CarMake,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create car make",
    });
  }
};


export const findAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const carMakers = await CarMakeModel.find();
    res.status(OK).json({
      success: true,
      data: carMakers,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch car makes",
    });
  }
};


export const findById = async (req: Request, res: Response): Promise<void> => {
  try {
    const carMake = await CarMakeModel.findById(req.params.id);
    if (!carMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car make not found",
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: carMake,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch the car maker",
    });
  }
};


export const updateCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await CarMakeModel.findByIdAndUpdate(
      req.params.id,
       req.body, {
      new: true,
      Validators: true
    });

    if (!updated) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car make not found",
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update list",
    });
  }
};


export const deleteCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await CarMakeModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "Car make not found",
      });
      return;
    }

    res.status(OK).json({
      success: true,
      message: "Car make deleted successfully",
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete the car maker",
    });
  }
};