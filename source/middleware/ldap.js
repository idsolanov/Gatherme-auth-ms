'use strict'
const Account = require('../models/acount')
const ldapjs = require('ldapjs')
const config = require('./source/config')

const ldapOptions = {
    url:config.LDAPurl,
    timeout:config.LDAPTimeOut,
    connectTimeout: config.LDAPConnectTimeOut,
    reconnect: config.LDAPReconnect
  };
  
//const ldapClient = ldapjs.createClient(ldapOptions);

function signUp(req,res){

    const account= new Account({
        email : req.body.email,
        nickName: req.body.nickName,
        password: req.body.password
    })
    let addUser = (account) => {
        return new Promise((resolve, reject) => {
      
          // 1
          const ldapClient = ldapjs.createClient(ldapOptions);

          ldapClient.on('error', function (err) {
            if (err.syscall == "connect") {
              console.log(err);
            }
          });
      
          // 2
          ldapClient.bind(
            //ldapConfig.pwdUser,
            config.LDAPuser,
            //ldapConfig.pwdUserPassword,
            config.LDAPpassword,
            (err) => {
      
              if (err) return reject(err);
      
              let newUser = {
                cn: account.email,
                nickName: account.nickName,
                Password: account.password,
                objectClass: ["account", "organizationalaccount", "inetOrgAccount"]
                //pwdPolicySubentry: ldapConfig.pwdPolicySubentry
              };
      
              // 3
              ldapClient.add(
                'cn=' + account.email + ',' + config.LDAPdomain,
                newUser,
                (err, response) => {
                  if (err) return reject(err);
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