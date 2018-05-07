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
    socket.on('send_msg',(data)=>{
       // console.log('recieved message '+ data.message);
        io.emit('recieved_msg',data)
    })
})

server.listen(5000,()=>{
    console.log('server started')
});