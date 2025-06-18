import { Request, Response } from "express";
import CarModel from "../models/Car.model";
import CarDealerModel from "../models/CarDealer.model";
import CarMakeModel from "../models/CarMake.model";
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status";


export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dealerId,
       carMakeId, 
       name,
       price, 
       year, 
       color,
        wheelsCount 
      } = req.body

    if (!dealerId || !carMakeId || !name || !price || !year || !color || !wheelsCount ) {
       res.status(BAD_REQUEST).json({
        success: false,
        error: 'All fields are required',
      });
    }

    const dealer = await CarDealerModel.findById(dealerId);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: ' Dealer not found ',
      });
      return;
    }

    const make = await CarMakeModel.findById(carMakeId);
    if (!make) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car make not found',
      });
      return;
    }

    const newCar = await CarModel.create({
       dealerId, 
       carMakeId,
        name, 
        price,
         year, 
         color, 
         wheelsCount 
        });
   

     res.status(CREATED).json({
      success: true,
      data: newCar,
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create car',
    });
  }
};


export const getAllCars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cars = await CarModel.find();
     res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get cars',
    });
  }
};


export const getCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
       res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
    }

     res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get car',
    });
  }
};


export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dealerId, carMakeId, name, price, year, color, wheelsCount } = req.body;

    const updated = await CarModel.findByIdAndUpdate(
      req.params.id,
      { dealerId,
         carMakeId, 
         name, price,
          year, 
          color,
           wheelsCount
           },
      { 
        new: true,
         runValidators: true
         }
    );

    if (!updated) {
       res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
    }

     res.status(OK).json({
      success: true,
      data: updated,
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update car',
    });
  }
};


export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteCar = await CarModel.findById(req.params.id);

    if (!deleteCar) {
       res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
    }

     res.status(OK).json({
      success: true,
      message: 'Car deleted successfully',
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete car',
    });
  }
};