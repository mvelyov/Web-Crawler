const mysql = require('mysql');
let connection = null;

const setup = (configuration) => {
    connection = mysql.createConnection(configuration);
    connection.connect();
};

const execute = (queryString) => {
    return new Promise((resolve, reject) => {
        connection.query(queryString, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};

module.exports = {
    setup,
    execute,
};
