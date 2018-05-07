window.onload = function () {


    let socket = io();

    socket.on('connected', () => {
        console.log('connected' + socket.id);
    })

}

