const db = require('../models')
const io = require('../index.js')
const Problems = db.problems
const Op = db.Sequelize.Op

// Create and save a new problem
exports.create = (req, res) => {
    // Validate request
    if (!req.body?.name) {
        res.status(400).send({
            message: 'Problem name can not be empty!',
        })
        return
    }

    // Create a new problem
    const problem = {
        name: req.body.name,
        grade: req.body.grade,
        setter: req.body.setter,
        rate: req.body.rate,
        done: req.body.done,
        feet: req.body.feet,
    }

    // Save the new problem in the database
    Problems.create(problem)
        .then((data) => {
            res.send(data)
            io.emit('problems:create', data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the new problem.',
            })
        })
}

// Retrieve all holds from the database.
exports.findAll = (req, res) => {
    Problems.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving problems.',
            })
        })
}

// Delete a targeted problem with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    Problems.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'The problem was deleted successfully!',
                })
                io.emit('problems:delete', id)
            } else {
                res.send({
                    message: `Cannot delete the problem #${id}. Maybe the problem was not found!`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete the problem with id=${id}`,
            })
        })
}

// Delete all problems from the database.
exports.deleteAll = (req, res) => {
    Problems.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Problems were deleted successfully!`,
            })
            io.emit('problems:list', [])
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all problems.',
            })
        })
}
