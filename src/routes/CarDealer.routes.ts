import { Router } from 'express';
import {
    createCarDealer,
    getAllCarDealers,
    getDealerById,
    updateCarDealer,
    deleteDealerById,
} from '../controllers/CarDealer.controller';

const router = Router({ mergeParams: true });

router.route('/')
  .get(getAllCarDealers)
  .post(createCarDealer);
router.route('/:id')
  .get(getDealerById)
  .put(updateCarDealer)
  .delete(deleteDealerById);

export default router; 