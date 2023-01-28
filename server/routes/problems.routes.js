module.exports = (app) => {
    const problems = require('../controllers/problems.controller.js')

    var router = require('express').Router()

    // Create a new problem
    router.post('/', problems.create)

    // Retrieve all problems
    router.get('/', problems.findAll)

    // Delete a problem with id
    router.delete('/:id', problems.delete)

    // Delete all problems
    router.delete('/', problems.deleteAll)

    app.use('/api/problems', router)
}
