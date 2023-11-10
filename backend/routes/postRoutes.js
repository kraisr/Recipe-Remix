import express from 'express';
import { savePost, addRatingToPost, fetchPostById, fetchPostsByUser } from '../controllers/postController.js';

const router = express.Router();

router.post('/create-post', savePost);

router.post('/addRating', addRatingToPost);

router.get('/fetch-user-posts', fetchPostsByUser);

router.get('/:postId', fetchPostById);

export default router;
