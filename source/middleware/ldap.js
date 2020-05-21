'use strict'
const Account = require('../models/acount')
const ldapjs = require('ldapjs')
const config = require('../config')

const ldapOptions = {
    url:config.LDAPurl,
    timeout:config.LDAPTimeOut,
    connectTimeout: config.LDAPConnectTimeOut,
    reconnect: config.LDAPReconnect
  };
  
//const ldapClient = ldapjs.createClient(ldapOptions);

function signUp(req,res){

    const accountt= new Account({
        email : req.body.email,
        nickName: req.body.nickName,
        password: req.body.password
    })
    console.log("aca ya encontre el json y cree mi account")
    let addUser = (accountt) => {
        return new Promise((resolve, reject) => {
          console.log("entro a mi promesa :v")
          // 1
          const ldapClient = ldapjs.createClient(ldapOptions);
          console.log("logre crear el ldapclient")

          ldapClient.on('error', function (err) {
            if (err.syscall == "connect") {
              console.log(err);
              return res.status(500).send({
                message: 'error en la funcion on'
              })
            }
            console.log("al parecer no hay error en la funcion .on")
          });
      
          // 2
          ldapClient.bind(
            //ldapConfig.pwdUser,
            config.LDAPuser,
            //ldapConfig.pwdUserPassword,
            config.LDAPpassword,
            (err) => {
      
              if (err) {
                res.status(500).send({
                  message: 'error en la funcion bind'
                })
                return reject(err);}
      
              let newUser = {
                cn: account.email,
                nickName: account.nickName,
                Password: account.password,
                objectClass: ["account", "organizationalaccount", "inetOrgAccount"]
                //pwdPolicySubentry: ldapConfig.pwdPolicySubentry
              };
              console.log("pude crear el usuario")
              // 3
              console.log('cn=' + account.email + ',' + config.LDAPdomain)
              ldapClient.add(
                'cn=' + account.email + ',' + config.LDAPdomain,
                newUser,
                (err, response) => {
                  if (err) {
                    res.status(500).sedn({
                      message: 'error en la funcion add'
                    })
                    return reject(err);}
                  res.status(200).send({
                    message: 'funciono perfecto!!'
                  })
                  return resolve(response);
                }
              );
            }
          );
        });
      }


}
module.exports={
    signUp
}