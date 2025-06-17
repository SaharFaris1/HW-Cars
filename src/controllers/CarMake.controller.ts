import { Request, Response } from "express"
import { carmakeStore } from "../store/CarMake.store"
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../utils/http-status"
export const createCarMaker = async ( req: Request, res: Response): Promise<void> => {
  try {
    const { country, brand } = req.body

    if (!country || !brand) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "all fields are required",
      })
      return
    }

    const carMaker = carmakeStore.create({ country, brand })
    res.status(CREATED).json({
      success: true,
      data: carMaker,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create car maker",
    })
  }
}
export const findAll = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const carMakers = carmakeStore.findAll()
    res.status(OK).json({
      success: true,
      data: carMakers,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch car makers",
    })
  }
}
export const findById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carMaker = carmakeStore.findById(req.params.id)
    if (!carMaker) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car maker not found",
      })
      return
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch the car maker",
    })
  }
}
export const updateCarMake = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carMaker = carmakeStore.update(req.params.id, req.body)
    if (!carMaker) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car maker not found",
      })
      return
    }
    res.status(OK).json({
      success: true,
      data: carMaker,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update list",
    })
  }
}

export const deleteCarMake = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = carmakeStore.delete(req.params.id)
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car maker not found",
      })
      return
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete the car maker",
    })
  }
}