module.exports = (app) => {
    const holds = require('../controllers/holds.controller.js')

    var router = require('express').Router()

    // Create a new hold
    router.post('/', holds.create)

    // Retrieve all holds
    router.get('/', holds.findAll)

    // Update a hold with id
    router.put('/:id', holds.update)

    // Delete a hold with id
    router.delete('/:id', holds.delete)

    // Delete all holds
    router.delete('/', holds.deleteAll)

    // Retrieve a single hold with id
    router.get('/:id', holds.findOne)

    app.use('/api/holds', router)
}
