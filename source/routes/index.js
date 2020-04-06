'use strict'
const express = require('express')
const api = express.Router()
const accountCtrl = require('../controllers/acount')
const auth =require('../middleware/auth')


api.post('/signUp',accountCtrl.signUp)

api.post('/signIn',accountCtrl.signIn)

api.post('/auth',accountCtrl.youcanPass)

api.get('/account/:id', auth.isAuth, accountCtrl.getAccount)
api.get('/accounts', auth.isAuth, accountCtrl.getAccounts)
api.post('/account', auth.isAuth, accountCtrl.saveAccount)
api.put('/account/:id', auth.isAuth, accountCtrl.updateAccount)
api.delete('/account/:id', auth.isAuth, accountCtrl.deleteAccount)


module.exports = api
