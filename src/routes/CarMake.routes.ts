import { Router } from 'express';
import {
    createCarMaker,
    findAll,
    findById,
    updateCarMake,
    deleteCarMake,
} from '../controllers/CarMake.controller';

const router = Router();

router.route('/')
  .get(findAll)
  .post(createCarMaker);
router.route('/:id')
  .get(findById)
  .put(updateCarMake)
  .delete(deleteCarMake);
export default router; 