const express = require('express')
const utility = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {pwd: 0, __v: 0}

Router.get('/list', (req, res) => {
  const { type } = req.query
  User.find({ type }, (err, doc) => res.json({ code: 0, data: doc}))
  // User.remove({}, (err, doc) => err ? console.log(err) : console.log(doc))
})

Router.post('/login', (req, res) => {
  console.log(req.body)
  const {user, pwd} = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误 '})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})

Router.post('/regist', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '该用户名已存在'})
    }
    // return User.create({ user, pwd: md5Pwd(pwd), type}, (e, d) => {
    //   if (e) {
    //     return res.json({code: 1, msg: '数据库错误,请重新注册'})
    //   } else {
    //     return res.json({code: 0, msg: '注册成功!'})
    //   }
    // }) 
    const UserModel = new User({user, type, pwd: md5Pwd(pwd)})
    return UserModel.save((e, d) => {
      if (e) {
        return res.json({code: 1, msg: '数据库错误,请重新注册'})
      }
      const {type, user, _id} = d
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})

Router.get('/info', (req, res) => {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }

  User.findOne({_id: userid}, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

Router.post('/update', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  const body = req.body
  return User.findByIdAndUpdate(userid, body, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后台错误'})
    }
    const data = Object.assign({}, {user: doc.user, type: doc.type}, body)
    return res.json({code: 0, data})
  })
})

function md5Pwd(pwd) {
  const solt = '%El4Y*lg8E&fKG92@7_UYxm#lXH6^Fi12Ks!'
  return utility.md5(utility.md5(pwd+solt+pwd))
}

module.exports = Router
