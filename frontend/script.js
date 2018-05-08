
    let socket = io();

    socket.on('connected', () => {
        console.log('connected' + socket.id);
    })

    $(function () {
        let msglist = $('#msglist');
        let sendbtn = $('#sendmsg');
        let msgbox = $('#msgbox');
        let loginbox = $('#loginbox');
        let loginbtn = $('#login');
        let logindiv = $('#login-div');
        let chatdiv = $('#chat-div');



        sendbtn.click(function () {
            let msg = msgbox.val();

            socket.emit('send_msg',{message:msg,user:user})
        })

        socket.on('recieved_msg',function (data) {
            msglist.append($(`<li>`+data.user + ' : ' +data.message+`</li>`))
        })

        let user = '';

        loginbtn.click(function () {
            user = loginbox.val();
            logindiv.hide();
            chatdiv.show();

        })
    })


