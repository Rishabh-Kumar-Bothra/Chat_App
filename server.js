const express = require('express');
const path =  require('path');
const sockets = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io =sockets(server)

app.use('/',express.static(path.join(__dirname,'frontend')));

io.on('connection',(socket)=>{
    console.log('new connection found'+ socket.id);
    socket.emit('connected');
})

server.listen(5000,()=>{
    console.log('server started')
});