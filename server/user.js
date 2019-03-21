const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})

Router.post('/regist', (req, res) => {
  console.log(req.body)
  const {user, pwd, type} = req.body
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '该用户名已存在'})
    }
    return User.create({user, pwd, type}, (e, d) => {
      if (e) {
        return res.json({code: 1, msg: '数据库错误,请重新注册'})
      } else {
        return res.json({code: 0, msg: '注册成功!'})
      }
    })
  })
})

Router.get('/info', (req, res) => {
  return res.json({code: 1})
})

module.exports = Router
