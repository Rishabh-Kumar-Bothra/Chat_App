
let socket = io();

socket.on('connection',()=>{
    console.log('connected' + socket.id);
})

