'use strict'
const Token = require('../models/token')

function getToken(t){
    
    Token.findOne({token:t},(err,tokenF)=>{
        if(err) return false
        return true
    })
}
function saveToken(req,res){
    let t = new Token()
    t.token= req.headers.authorization.split(" ")[1]
    t.save((err,tokenstored)=>{
        if(err) return res.status(500).send({message: `internal server error ${err}`})
        return res.status(200).send(tokenstored)
    })
}
function token(req,res,next){
    if (!req.headers.authorization){
        return res.status(403).send({
            authorization:false,
            message:"no estas autorizado"})
    }
    let t= req.headers.authorization.split(" ")[1]
    Token.findOne({token:t},(err,tokenF)=>{
        if(err) return res.status(500).send({
            authorization: false,
            message: `internal server error ${err}`})
        if(tokenF) return res.status(401).send({
            authorization: false,
            message:'token en blacklist'})
        next()
    })
}

module.exports = {
    saveToken,
    getToken,
    token
}