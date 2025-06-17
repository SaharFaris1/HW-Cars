import { CarDealer } from '@/models/CarDealer.model';
import { generateId } from '../utils/generate-id';

const dealers: Map<string, CarDealer> = new Map();

const create = (data: Omit<CarDealer, 'id' | 'createdAt' | 'updatedAt'>): CarDealer => {
  const id = generateId();
  const now = new Date();

  const dealer: CarDealer = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  dealers.set(id, dealer);
  return dealer;
};


const findAll = (): CarDealer[] => {
  return Array.from(dealers.values());
};


const findById = (id: string): CarDealer | undefined => {
  return dealers.get(id);
};


const findByCarDealerId = (dealerId: string): CarDealer[] => {
  return findAll().filter(dealer => dealer.id === dealerId);
};
// here


const update = (id: string, data: Partial<Omit<CarDealer, 'id' | 'carDealerId' | 'createdAt'>>): CarDealer | undefined => {
  const dealer = dealers.get(id);
  if (!dealer) return undefined;

  const updatedDealer: CarDealer = {
    ...dealer,
    ...data,
    updatedAt: new Date(),
  };

  dealers.set(id, updatedDealer);
  return updatedDealer;
};


const deleteDealers = (id: string): boolean => {
  return dealers.delete(id);
};


const deleteByCarDealersId = (dealerId: string): void => {
  const cardealersToDelete = findByCarDealerId(dealerId);
  cardealersToDelete.forEach(dealer => dealers.delete(dealer.id));
};


export const dealerStore = {
  create,
  findAll,
  findById,
  findByCarDealerId,
  update,
  delete: deleteDealers,
  deleteByCarDealersId,
};