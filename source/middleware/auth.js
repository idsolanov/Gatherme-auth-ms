'use strict'
const services = require('../service')

function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({
            authorization:false,
            message:"no estas autorizado"})
    }
    const token = req.headers.authorization.split(" ")[1]
    services.decodeToken(token)
        .then(response =>{
            req.account=response
            next()
        })
        .catch(response=>{
            res.status(response.status).send({
                authorization:false,
                message: response.message})
        })
}

module.exports={
    isAuth
}