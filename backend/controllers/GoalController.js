const Goal = require('../models/Goal')

class GoalController {
    asyncHandler = require('express-async-handler')
    // @desc get all goals
    // @route Get api/goals/
    // access @private
    index = this.asyncHandler(async (req, res) => {
        const goals = await Goal.find();
        res.status(200)
        res.json({
            data: goals,
        })
    })

    // @desc get all goals
    // @route Post api/goals/
    // access @private
    store = this.asyncHandler(async (req, res) => {
        this.validate(req, res)
        const goal = await Goal.create({ text: req.body.text })
        res.status(201).json({
            msg: 'store goal',
            data: goal
        })
    })

    // @desc update a single goal
    // @route Patch api/goals/:id
    // access @private
    update = this.asyncHandler(async (req, res) => {
        const goal = await Goal.findById(req.params.id)
        if (!goal) {
            res.status(400)
            throw new Error("Goal not found!")
        }
        this.validate(req, res)
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedGoal)
    })

    // @desc delete a single goal
    // @route Delete api/goals/:id
    // access @private
    destroy = this.asyncHandler(async (req, res) => {
        const goal = await Goal.findById(req.params.id)
        if (!goal) {
            res.status(400)
            throw new Error("Goal not found!")
        }
        goal.remove()
        res.json('delete goal id:' + req.params.id)
    })

    // validate incoming request
    validate = (req, res) => {
        if (!req.body.text) {
            res.status(400)
            throw new Error('Text is required')
        }
    }
}

module.exports = new GoalController;