var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var clients = 0;

let serveFile = (f, s) => {
    s.sendFile(__dirname + f)
}

app.get('/', (q, s) => {
    serveFile('/index.html', s)
})

app.get('/:room', (q, s) => {
    let r = q.params["room"]
    if (r.indexOf('.js') > -1 || r.indexOf('.css') > -1) serveFile('/'+r, s)
    else serveFile('/room.html', s)
})

app.get('/emoji-data/sheet_apple_64.png', (q, s) => {
    serveFile('/emoji-data/sheet_apple_64.png', s)
})

app.get('/favicon.ico', (q, s) => {
    serveFile('/favicon.ico', s)
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
    skt.on('refresh', (c) => {
        io.to(c.room).emit('refresh', c)
    })
    skt.on('change', (c) => {
        if (c.op.origin == '+input' || c.op.origin == 'paste' || c.op.origin == '+delete')
            io.to(c.room).emit('change', c)
    })
    skt.on('disconnected', (s) => {
        console.log(s.room +"/"+s.sender+" disconnected.")
        io.to(s.room).emit('chat message', {
            sender: 'white',
            text: s.sender+' has left the room',
            room: s.room
        })
    })
})

http.listen(port, () => {
    console.log('Listening on *:' + port)
})