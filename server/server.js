const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const userRouter = require('./user')
const port = 8080

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

const model = require('./model')
const Chat = model.getModel('chat')
io.on('connection', socket => {
  socket.on('sendmsg', (data) => {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, (err, d) => {
      io.emit('recvmsg', Object.assign({}, d._doc))
    })
    // io.emit('recvmsg', data)
    // return res.json({code: 0})
  })
})

// mongoose.connection.on('connected', () => {
//   console.log('mongo connect success')
// })

// const User = mongoose.model('user', mongoose.Schema({
//   user: { type: String, require: true },
//   age: { type: Number, require: true }
// }))

// User.create({user: 'ly', age: 18}, (err, doc) => {
//   err ? console.log(err) : console.log(doc)
// })

// User.remove({user: 'xml'}, (err, doc) => {
//   err ? console.log(err) : console.log(doc)
// })

// User.update({user: 'ksm'}, {'$set': {age: 24}}, (err, doc) => {
//   err ? console.log(err) : console.log(doc)
// })

server.listen(port, () => console.log(`NodeJS run on port ${port}`))
