module.exports={
    port : process.env.PORT || 3001,
    dbhost: 'gatherme-authentication-db',
    localhost: 'localhost',
    db: process.env.MONGODB|| 'mongodb://gatherme-authentication-db:27017/auth_ms',
    SECRET_TOKEN: '104179G104183A104207T104231H104233E104239R104243M104281E104287AUTH104297',
    ldap_port:1389,
    ldap_url:'ldap://gatherme-ldap',
    ldap_timeout: 1000,
    ldap_connectTimeout: 1000,
    ldap_Server_user:'cn = root',
    ldap_Server_password:'gatherme'


}