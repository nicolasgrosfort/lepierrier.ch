const db = require('../models')
const io = require('../index.js')
const Holds = db.holds

// Create and save a new hold
exports.create = (req, res) => {
    // Validate request
    if (!req.body?.pxs || !req.body?.pys) {
        res.status(400).send({
            message: 'Coordinates of a new hold can not be empty!',
        })
        return
    }

    // Create a new hold
    const holds = {
        pxs: req.body.pxs,
        pys: req.body.pys,
    }

    // Save the new hold in the database
    Holds.create(holds)
        .then((data) => {
            res.send(data)
            io.emit('holds:create', data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the new hold.',
            })
        })
}

// Retrieve all holds from the database.
exports.findAll = (req, res) => {
    Holds.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving holds.',
            })
        })
}

// Update a targeted hold by the id in the request
exports.update = (req, res) => {
    const id = req.params.id

    console.log(req.body)

    Holds.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'The hold was updated successfully.',
                })
            } else if (num == 0) {
                res.send({
                    message: `Nothing changed on the hold #${id}.`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error updating the hold with id=${id}`,
            })
        })
}

// Delete a targeted hold with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    Holds.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'The hold was deleted successfully!',
                })
                io.emit('holds:delete', id)
            } else {
                res.send({
                    message: `Cannot delete the hold #${id}. Maybe the hold was not found!`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete the hold with id=${id}`,
            })
        })
}

// Find a single hold with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    Holds.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find the hold with id=${id}.`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving the hold with id=${id}`,
            })
        })
}

// Delete all holds from the database.
exports.deleteAll = (req, res) => {
    Holds.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Holds were deleted successfully!`,
            })
            io.emit('holds:list', [])
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all holds.',
            })
        })
}
