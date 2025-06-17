import { Request, Response } from 'express';
import { CarStore } from '../store/Car.store';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
export const createCar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { dealerId, carMakeId, name, price, year, color, wheelsCount } = req.body;
  
      if (!dealerId || !carMakeId || !name || !price || !year) {
        res.status(BAD_REQUEST).json({
          success: false,
          error: ' all fields (dealerId, carMakeId, name, price, year) required',
        });
        return;
      }
  
      const newCar = CarStore.create({
        dealerId,
        carMakeId,
        name,
        price,
        year,
        color,
        wheelsCount,
      });
  
      res.status(CREATED).json({
        success: true,
        data: newCar,
      });
    } catch (error) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: error instanceof Error ? error.message : "Faild to create car",
      });
    }
  };
  export const getAllCars = async (_req: Request, res: Response): Promise<void> => {
    try {
      const cars = CarStore.findAll();
  
      res.status(OK).json({
        success: true,
        data: cars,
      });
    } catch (error) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: error instanceof Error ? error.message : "Faild to get cars",
      });
    }
  };

  export const getCarById = async (req: Request, res: Response): Promise<void> => {
    try {
      const car = CarStore.findById(req.params.id);
  
      if (!car) {
        res.status(NOT_FOUND).json({
          success: false,
          error:"Faild to get car"
        });
        return;
      }
  
      res.status(OK).json({
        success: true,
        data: car,
      });
    } catch (error) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: error instanceof Error ? error.message : "Faild to get cars",
      });
    }
  };

  export const updateCar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { dealerId, carMakeId, name, price, year, color, wheelsCount } = req.body;
      const { id } = req.params;
  
      const existingCar = CarStore.findById(id);
      if (!existingCar) {
        res.status(NOT_FOUND).json({
          success: false,
          error: "Faild to get Car"
        });
        return;
      }
  
      const updatedCar = CarStore.update(id, {
        dealerId,
        carMakeId,
        name,
        price,
        year,
        color,
        wheelsCount,
      });
  
      if (!updatedCar) {
        res.status(BAD_REQUEST).json({
          success: false,
          error: "Faild to update Car",
        });
        return;
      }
  
      res.status(OK).json({
        success: true,
        data: updatedCar,
      });
    } catch (error) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: error instanceof Error ? error.message : "Faild to update Cars",
      });
    }
  };
  export const deleteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = CarStore.delete(req.params.id);
  
      if (!deleted) {
        res.status(NOT_FOUND).json({
          success: false,
          error: 'Faild to get car',
        });
        return;
      }
  
      res.status(OK).json({
        success: true,
        message: 'Deleted Successfuly',
      });
    } catch (error) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: error instanceof Error ? error.message : 'faild to get cars',
      });
    }
  };