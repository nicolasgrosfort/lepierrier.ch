const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const ip = require('ip')

const port = 5121
const vitejs = '192.168.1.6'
const corsOptions = {
    origin: [
        'http://localhost:5122',
        'http://localhost:5123',
        `http://${vitejs}:5122`,
        `http://${vitejs}:5123`,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
}

const io = new Server(server, {
    cors: corsOptions,
})

const db = require('./models')
db.sequelize
    .sync()
    .then(() => {
        console.log('Synced db.')
    })
    .catch((err) => {
        console.log('Failed to sync db: ' + err.message)
    })

let _connected = 0

app.use(bodyParser.json())
app.use(cors(corsOptions))

io.on('connection', (socket) => {
    _connected++
    console.log('user connected: ', _connected)
    io.emit('user:traffic', _connected)

    socket.on('disconnect', () => {
        _connected--
        console.log('user connected: ', _connected)
        io.emit('user:traffic', _connected)
    })
})

module.exports = io

require('./routes/holds.routes')(app)
require('./routes/problems.routes')(app)

server.listen(port, () => {
    console.log(`Server running on http://${ip.address()}:${port}`)
})
