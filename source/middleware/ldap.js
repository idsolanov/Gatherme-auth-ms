'use strict'
const Account = require('../models/acount')
const ldapjs = require('ldapjs')
const config = require('../config')


function signUp(req,res,next){

  const account= new Account({
    email : req.body.email,
    nickName: req.body.nickName,
    password: req.body.password
  })
  
  const client = ldapjs.createClient({

    url : config.ldap_url+":"+config.ldap_port,
    timeout : config.ldap_timeout,
    connectTimeout: config.ldap_connectTimeout,
    reconnect: true
    
  })

  client.bind(config.ldap_Server_user, config.ldap_Server_password, function(err) {
    if(err){
      console.log(`Conexion Fallida error: ${err}`)
      return res.status(500).send({
        message: `Conexion Fallida error: ${err}`
      })
    }else{
      console.log("Conexion exitosa!!!")

      var entry = {
        cn: account.email,
        nickName: account.nickName,
        password: account.password,
        objectclass: 'inetOrgPerson'
      };

      client.add(`cn = ${entry.cn}, ou = users, o = gatherme`, entry, function(err) {
        if(err){
          console.log(`error al crear cuenta, error: ${err}`)
          client.unbind()
          client.destroy()
          return res.status(500).send({
            message: `error al crear cuenta, error: ${err}`
          })
        }else{
          console.log("Cuenta creada correctamente!!")
          client.unbind()
          client.destroy()
          next()
        }
      });
    }
  });
}

function search(req,res,next) {
  
  const account= new Account({
    email : req.body.email,
    password: req.body.password
  })
  
  const client = ldapjs.createClient({

    url : config.ldap_url+":"+config.ldap_port,
    timeout : config.ldap_timeout,
    connectTimeout: config.ldap_connectTimeout,
    reconnect: true

  })

  client.bind(config.ldap_Server_user, config.ldap_Server_password, function(err) {
    if(err){
      console.log(`Conexion Fallida error: ${err}`)
      return res.status(500).send({
        message: `Conexion Fallida error: ${err}`
      })
    }else{
      console.log("Conexion exitosa!!!")

      client.compare(`cn = ${account.email}, ou = users, o = gatherme`, 'password', account.password, function(err, matched) {
        
        if(err){
          client.unbind()
          client.destroy()
          return res.status(500).send({message:`Fallo en el Servidor error: ${err}`})
        } 
        if(matched){
          console.log('matched: ' + matched);
          console.log(`Cuenta encontrada`)
          client.unbind()
          client.destroy()
          next()
        }else{
          client.unbind()
          client.destroy()
          return res.status(404).send({message: `No se encuentra Registro`})
        }
        
      }); 
    }
  });

  
}
module.exports={
    signUp,
    search
}