const db = require('../models')
const io = require('../index.js')
const Paths = db.paths

// Create and save a new hpathold
exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
    if (req.body?.type == '') {
        res.status(400).send({
            message: 'Type of path can not be empty!',
        })
        return
    }
    // Save the new path in the database
    Paths.create(req.body)
        .then((data) => {
            res.send(data)
            io.emit('paths:create', data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the new path.',
            })
        })
}
