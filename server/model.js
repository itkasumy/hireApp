const mongoose = require('mongoose')

// Connection URL
const DB_URL = 'mongodb://localhost:27017/hire'

mongoose.connect(DB_URL, { useNewUrlParser: true })

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 个人头像
    'avatar': {type: String},
    // 个人简介或职位描述
    'desc': {type: String},
    // 职位名 
    'title': {type: String},
    'company': {type: String},
    'money': {type: String}
  },
  chat: {
    chatid: {type: String, require: true},
    read: {type: Boolean, default: false},
    from: {type: String, require: true},
    to: {type: String, require: true},
    content: {type: String, require: true, default: ''},
    create_time: {type: Number, default: new Date().getTime()}
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}
