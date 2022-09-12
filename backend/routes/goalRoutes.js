const express = require('express');
const router = express.Router()
const goalController = require('../controllers/GoalController')

router.route('/').get(goalController.index).post(goalController.store)
router.route('/:id').put(goalController.update).delete(goalController.destroy)

module.exports = router;