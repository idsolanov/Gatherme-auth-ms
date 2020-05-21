module.exports={
    port : process.env.PORT || 3001,
    dbhost: 'gatherme-authentication-db',
    localhost: 'localhost',
    db: process.env.MONGODB|| 'mongodb://gatherme-authentication-db:27017/auth_ms',
    SECRET_TOKEN: '104179G104183A104207T104231H104233E104239R104243M104281E104287AUTH104297',
    LDAPurl: 'ldap://172.17.0.1:636',
    LDAPTimeOut: 100,
    LDAPConnectTimeOut: 100,
    LDAPReconnect: true,
    LDAPuser:'cn=admin,dc=arqsoft,dc=unal,dc=edu,dc=co',
    LDAPpassword: 'admin',
    LDAPdomain: 'arqsoft.unal.edu.co'

}