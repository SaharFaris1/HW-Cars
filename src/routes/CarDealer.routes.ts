import { Router } from 'express';
import {
  createCarDealer,
    getCarDealers,
    getCarDealerById,
    updateCarDealer,
    deleteDealerById,
} from '../controllers/CarDealer.controller';

const router = Router({ mergeParams: true });

router.route('/')
  .get(getCarDealers)
  .post(createCarDealer);
router.route('/:id')
  .get(getCarDealerById)
  .put(updateCarDealer)
  .delete(deleteDealerById);

export default router; 