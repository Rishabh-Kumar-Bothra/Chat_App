const express = require('express');
const path =  require('path');
const sockets = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io =sockets(server)

let usersockets = {};

app.use('/',express.static(path.join(__dirname,'frontend')));

io.on('connection',(socket)=>{
    console.log('new connection found'+ socket.id);
    socket.emit('connected');

    socket.on('login',(data)=>{
        usersockets[data.user] = socket.id;
        console.log(usersockets);
    })
    socket.on('send_msg',(data)=>{

        if(data.message.startsWith('@')){
            let recipient = data.message.split(':')[0].substr(1);
            let recptsocket = usersockets[recipient]
            io.to(recptsocket).emit('recieved_msg',data)
        }
        else {
            // console.log('recieved message '+ data.message);
            //if we use io.emit everyone including us recieves the message (our own message also)
            //if we use socket.broadcast.emit then only others will recieve msg
            socket.broadcast.emit('recieved_msg', data)
        }
    })
})

server.listen(5000,()=>{
    console.log('server started')
});