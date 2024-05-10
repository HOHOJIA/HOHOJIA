const fs = require('fs');
const connectionPromise = require('../../config/db').connectionPromise;

/**
 * Execute a sql file containing multiple sql statements split by new line
 * @param {String} sqlFile
 */
const executeSql = async (sqlFile) => {
    // const sqls = fs.readFileSync(path.join(__dirname, sqlFile)).toString().split('\n');
    const sqls = fs.readFileSync(sqlFile).toString().split('\n');
    for (const sql of sqls) {
        if (sql.trim() !== '') {
            await connectionPromise.query(sql.trim());
        }
    }
}

module.exports = {
    executeSql
}