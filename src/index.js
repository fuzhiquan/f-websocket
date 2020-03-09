const express = require('express')
const websocketServer = require('ws').Server

const app = express()
app.use(express.static(__dirname))
app.listen(3000)

const server = new websocketServer({port: 4000})
const sockets = []
server.on('connection', function(socket) {
    sockets.push(socket)
    socket.on('message', function(message) {
        socketEmit(message)
    })
})

function socketEmit(message) {
    sockets.forEach(socket => socket.send(message))
}