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


api.get('/account/:id', tokenCtrl.token, auth.isAuth, accountCtrl.getAccount)
api.get('/accounts', tokenCtrl.token, auth.isAuth, accountCtrl.getAccounts)
api.post('/account', tokenCtrl.token, auth.isAuth, accountCtrl.saveAccount)
api.put('/account/:id', tokenCtrl.token, auth.isAuth, accountCtrl.updateAccount)
api.delete('/account/:id', tokenCtrl.token, auth.isAuth, accountCtrl.deleteAccount)


module.exports = api
