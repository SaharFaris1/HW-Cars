import { Request, Response } from "express";
import CarDealerModel from "../models/CarDealer.model";
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status";


export const createCarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, email, city } = req.body;

    if (!id || !name || !email || !city) {
        res.status(BAD_REQUEST).json({
          success: false,
          error: "All fields are required",
        });
        return;
      }
    const newDealer = await CarDealerModel.create
    ({ 
        id,
         name, 
         email, 
         city
         });
 res.status(CREATED).json({
      success: true,
      data: newDealer,
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create car dealer',
    });
  }
};


export const getCarDealers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dealers = await CarDealerModel.find();
     res.status(OK).json({
      success: true,
      data: dealers,
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch car dealers',
    });
  }
};


export const getCarDealerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dealer = await CarDealerModel.findById(req.params.id);
    if (!dealer) {
       res.status(NOT_FOUND).json({
        success: false,
        error: 'Car dealer not found',
      });
    }

     res.status(OK).json({
      success: true,
      data: dealer,
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch car dealer',
    });
  }
};


export const updateCarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, city } = req.body;
// ابحث  حسب ID ثم تحديثه
    const updated = await CarDealerModel.findByIdAndUpdate(
      req.params.id,{ 
        name,
         email, 
         city },
      { 
        new: true,  // يجعل الدالة ترجع القيمه بعد التحديث
     
        Validators: true // التحقق من صحة البيانات عند التحديث
     }
    );

    if (!updated) {
       res.status(NOT_FOUND).json({
        success: false,
        error: 'Car dealer not found',
      });
    }

     res.status(OK).json({
      success: true,
      data: updated,
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update dealer',
    });
  }
};


export const deleteDealerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await CarDealerModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
       res.status(NOT_FOUND).json({
        success: false,
        error: 'Car dealer not found',
      });
    }

     res.status(OK).json({
      success: true,
      message: 'Dealer deleted successfully',
    });
  } catch (error) {
     res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete car dealer',
    });
  }
};