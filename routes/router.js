import express from 'express';
import { login, signUp } from '../controllers/auth.js';
import { searchAndFilter, getSource } from '../controllers/search.js'

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/search', searchAndFilter);
router.get('/get-source', getSource);


export default router;
