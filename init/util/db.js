/**
 * Created by 杨帆 on 2018/1/8.
 */

const mysql = require('mysql')
const config = require('./../../config')
const dbConfig = config.database

const pool = mysql.createPool({
    host     :  dbConfig.HOST,
    user     :  dbConfig.USERNAME,
    password :  dbConfig.PASSWORD,
    database :  dbConfig.DATABASE
})


let query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log( err )
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        console.log( err )
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })

}


module.exports = {
    query
}