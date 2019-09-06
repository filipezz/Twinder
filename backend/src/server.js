const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');


// criando o servidor
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUsers[user] = socket.id
    console.log('Client connectet:', user )

})

mongoose.connect(
    'mongodb+srv://filipez:filipez@cluster0-q5l38.mongodb.net/omnistack?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);


app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)
