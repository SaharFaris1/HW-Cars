import { Router } from 'express';
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} from '../controllers/Car.controller';
const router = Router();
router.route('/')
  .get(getAllCars)    
  .post(createCar);  

router.route('/:id')
  .get(getCarById)     
  .put(updateCar)     
  .delete(deleteCar); 

export default router;