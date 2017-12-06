var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var clients = 0;

app.get('/', (q, s) => {
    s.sendFile(__dirname + '/index.html')
})

var secret = ['turquoise', 'coral', 'tan', 'gold'];

io.on('connection', (skt) => {
    clients = clients + 1
    skt.on('join', (r) => {
        skt.join(r)
        scr = secret[Object.keys(io.sockets.adapter.rooms[r].sockets).length - 1]
        io.to(r).emit('joined', scr)
    })    
    skt.on('chat message', (m) => {
        io.to(m.room).emit('chat message', m)
    })
})

http.listen(port, () => {
    console.log('Listening on *:' + port)
})