'use strict'
const Account = require('../models/acount')
const tokenCntrl = require('../controllers/token')
const Service = require('../service/index')


function signUp(req, res){  

    const account= new Account({
        email : req.body.email,
        nickName: req.body.nickName,
        password: req.body.password
    })
    
    account.save((err)=>{
        if(err) return res.status(500).send({message: `error al crear el usuario ${err}`})
        res.status(201).send({
            email:account.email,
            nickName:account.nickName,
            token: Service.createToken(account)
        })
    })

}

function signIn(req, res){

    Account.findOne({ email: req.body.email},(err,account)=>{
        if(err) return res.status(500).send({message: `error: ${err}`})
        if(!account) return res.status(404).send({message: 'no existe la cuenta'})
        
        account.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) return res.status(500).send({error: `${err}`})
            if(!isMatch) return res.status(404).send({message:`datos incorrectos/ contraseña erronea`})

            req.account=account
            res.status(200).send({
                email: account.email,
                nickName: account.nickName,
                token: Service.createToken(account)
            })

        })

         
    })
}

function signOut(req,res){
    if(!req.headers.authorization){
        return res.status(403).send({
            authorization:false,
            message:"no estas autorizado"
        })
    }
    tokenCntrl.saveToken(req,res)
    

}

function authorization(req, res){

    if(!req.headers.authorization){
        return res.status(401).send({
            authorization:false,
            message:"no estas autorizado"
        })
    }
    const token = req.headers.authorization.split(" ")[1]
    Service.decodeToken(token)
    .then(response =>{
        req.account=response
        res.status(200).send({
            authorization:true,
            message:'estas autorizado'
        })
    })
    .catch(response=>{
        res.status(response.status).send({message: response.message})
    })
}

function getAccount(req,res){

    let accountId = req.params.id

    Account.findById(accountId,(err,account)=>{
        if (err) return res.status(500).send({message: 'error al realizar la peticion'})
        if(!account) return res.status(404).send({message:'el producto no existe'})

        res.status(200).send({account})
    })

}

function getAccounts(req,res){

    Account.find({},(err,accounts)=>{

        if(err) return res.status(500).send({message:'error en la peticion'})
        if(!accounts) return res.status(404).send({message:'no existen usuarios'})
        res.status(200).send({accounts})
    })
}

function updateAccount(req,res){

    let  accountId = req.params.id
    let update = req.body
    Account.findByIdAndUpdate(accountId,update,(err,accountUpdate)=>{
        if(err) return res.status(500).send({message: 'error al conectar con el servidor'})
        if(!accountUpdate) return res.status(404).send({message: `cuenta no encontrada`})
        accountUpdate.password=null
        res.status(200).send({accountUpdate})
    })
}

function saveAccount(req,res){

    let account = new Acount()
    account.nickName = req.body.nickName
    account.password = req.body.password
    account.email = req.body.email

    account.save((err,accountStrored) =>{
        if(err) res.status(500).send({message: `error al salvar en la base de datos: ${err}`})

        res.status(200).send({accountStrored})
    })
}

function deleteAccount(req,res){
    
    let accountId = req.params.id
    Account.findById(accountId,(err,account)=>{
        if(err) return res.status(500).send({message:'error al conectar con el servidor'})
        if(!account) return res.status(404).send({message:'la cuenta no existe'})

        account.remove(err=>{
            if(err) return res.status(500).send({message:'error al borrar la cuenta'})

            res.status(200).send({message:'cuenta eliminada correctamente'})
            
        })
    })
}

module.exports={
    signIn,
    signUp,
    signOut,
    getAccount,
    getAccounts,
    updateAccount,
    deleteAccount,
    saveAccount,
    authorization
}