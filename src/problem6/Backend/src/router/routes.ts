import { Router } from 'express';
import { updateScore, getTop10Scores,login } from '../utils';
import { verifyToken } from '../middaware/middaware';
const router = Router();

router.post('/scores/update',verifyToken, updateScore);
router.get('/scores/top10', getTop10Scores);
router.post('/login', login);
export default router;
