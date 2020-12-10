const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', socket => {
  socket.on('question', data => {
    io.emit('question', data)
  })
  socket.on('reponse', data => {
    io.emit('reponse', data)
  })
})

server.listen(80)