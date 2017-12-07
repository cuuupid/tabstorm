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

app.get('/emoji.js', (q, s) => {
    serveFile('/emoji.js', s)
})

app.get('/emoji.css', (q, s) => {
    serveFile('/emoji.css', s)
})

app.get('/style.css', (q, s) => {
    serveFile('/style.css', s)
})

app.get('/emoji-data/sheet_apple_64.png', (q, s) => {
    serveFile('/emoji-data/sheet_apple_64.png', s)
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
})

http.listen(port, () => {
    console.log('Listening on *:' + port)
})