import { Router } from 'express';
import { createLink, getLinks, updateLink, deleteLink, reorderLinks } from '../controllers/linkController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.post('/', isAuthenticated, createLink);
router.get('/user/:userId', getLinks);
router.put('/:id', isAuthenticated, updateLink);
router.delete('/:id', isAuthenticated, deleteLink);
router.put('/reorder/:userId', isAuthenticated, reorderLinks);

export default router;