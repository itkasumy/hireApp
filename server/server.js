const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const userRouter = require('./user')
const port = 8080

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

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

app.listen(port, () => console.log(`NodeJS run on port ${port}`))
