var mysql = require('mysql');
exports.getConnectionPoolForDaspAuthorization = function (config) {
    var pool = mysql.createPool({
        host: config.daspdbhost,
        port: config.daspdbport,
        user: config.daspdbuser,
        password: config.daspdbpassword,
        database: config.daspdbauth,
        multipleStatements: true
    });
    return pool;

};

exports.getConnectionPoolForCampaignDatabase = function (config) {
    var pool = mysql.createPool({
        host: config.daspdbhost,
        port: config.daspdbport,
        user: config.daspdbuser,
        password: config.daspdbpassword,
        database: config.daspdbname,
        multipleStatements: true
    });
    return pool;

};


