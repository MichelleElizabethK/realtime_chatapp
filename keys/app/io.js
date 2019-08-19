const socketIo = require('socket.io');
const Message = require('../models/message.model');

const users = [];
const connections = [];
const initialize = server => {
    const io = socketIo(server);
    io.on('connection', function (socket) {
        console.log('User connected');

        socket.on('username', data => {
            if (data.username) {
                socket.username = data.username;
                let user = { username: socket.username, id: socket.id };
                let existing = searchUser(user.username);
                if (existing == false) {
                    users.push(user);
                }

                io.emit('active', users);
                console.log('[%s] connected', socket.username);
                console.log('<users>:', users);
            }
        });
        socket.on('getactive', () => {
            socket.emit('active', users);
        });
        socket.on('disconnect', function () {
            console.log('User disconnected');
        });
    });

}

const searchUser = username => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            return users[i];
        }
    }

    return false;
};

module.exports = initialize;
