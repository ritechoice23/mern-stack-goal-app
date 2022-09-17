const express = require('express');
const router = express.Router()
const goalController = require('../controllers/GoalController');
const { auth } = require('../middlewares/authMiddleware');

router.route('/').get(auth, goalController.index).post(auth, goalController.store)
router.route('/:id').put(auth, goalController.update).delete(auth, goalController.destroy)

module.exports = router;