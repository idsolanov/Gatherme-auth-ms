'use strict'
const express = require('express')
const api = express.Router()
const accountCtrl = require('../controllers/acount')
const tokenCtrl= require('../controllers/token')
const auth =require('../middleware/auth')
const ldap = require ('../middleware/ldap')

api.post('/singUp',ldap.signUp,accountCtrl.singUp)
api.post('/singIn',ldap.search,accountCtrl.singIn)

api.post('/singOut',accountCtrl.singOut)

api.post('/auth',tokenCtrl.token,accountCtrl.authorization)


api.get('/account/:id', tokenCtrl.token, auth.isAuth, accountCtrl.getAccount)
api.get('/accounts', tokenCtrl.token, auth.isAuth, accountCtrl.getAccounts)
api.post('/account', tokenCtrl.token, auth.isAuth, accountCtrl.saveAccount)
api.put('/account/:id', tokenCtrl.token, auth.isAuth, accountCtrl.updateAccount)
api.delete('/account/:id', tokenCtrl.token, auth.isAuth, accountCtrl.deleteAccount)


module.exports = api
