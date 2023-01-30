module.exports = (app) => {
    const paths = require('../controllers/paths.controller.js')

    var router = require('express').Router()

    // Create a new path
    router.post('/', paths.create)

    app.use('/api/paths', router)
}
