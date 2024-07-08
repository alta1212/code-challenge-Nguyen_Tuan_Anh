import { Router } from 'express';
import {
  createPhone,
  listPhones,
  getPhone,
  updatePhone,
  deletePhone,
} from '../controllers/phoneController';

const router = Router();

router.post('/phones', createPhone);
router.get('/phones', listPhones);
router.get('/phones/:id', getPhone);
router.put('/phones/:id', updatePhone);
router.delete('/phones/:id', deletePhone);

export default router;
