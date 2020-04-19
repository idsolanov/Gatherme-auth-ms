'use strict'
const express = require('express')
const api = express.Router()
const accountCtrl = require('../controllers/acount')
const tokenCtrl= require('../controllers/token')
const auth =require('../middleware/auth')


api.post('/singUp',accountCtrl.singUp)

api.post('/singIn',accountCtrl.singIn)

api.post('/singOut',accountCtrl.singOut)

api.post('/auth',tokenCtrl.token,accountCtrl.authorization)


api.get('/account/:id', auth.isAuth, accountCtrl.getAccount)
api.get('/accounts', auth.isAuth, accountCtrl.getAccounts)
api.post('/account', auth.isAuth, accountCtrl.saveAccount)
api.put('/account/:id', auth.isAuth, accountCtrl.updateAccount)
api.delete('/account/:id', auth.isAuth, accountCtrl.deleteAccount)


module.exports = api
