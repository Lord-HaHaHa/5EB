try {
    var pool = require('./loginDatabase');
    module.exports = pool;
} catch (error) {
    var mariadb = require('mariadb');
    console.log(error)
    var pool = mariadb.createPool({
        host: '',
        port: '',
        user: '',
        database: '',
        password: '',
        connectionLimit: 5
    })
    
    pool.getConnection(function(err) {
        if (err) throw err;
        console.log('Database is connected successfully !');    
    });

    module.exports = {pool};
}