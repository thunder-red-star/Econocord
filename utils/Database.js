const { Connection, Request } = require("tedious");
const Chalk = require("chalk")

module.exports = class Database {
    constructor(url, database, user, pass) {
        const config = {
            authentication: {
                options: {
                    userName: user, // update me
                    password: pass // update me
                },
                type: "default"
            },
            server: url, // update me
            options: {
                database: database, //update me
                encrypt: true,
                rowCollectionOnRequestCompletion: true
            }
        };

        console.log(Chalk.red.bold("Attempting connection to the database..."));

        const connection = new Connection(config)

        connection.on("connect", err => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(Chalk.yellow.bold("Successful connection to the SQL Server has been made!"));
            }
        });

        connection.connect();

        return connection

    }

    static get_prefix(connection, guild_id) {
        return new Promise((resolve, reject) => {
            const request = new Request(
                `SELECT prefix FROM prefixes WHERE id = ${guild_id}`
                , (err, rowCount, rows) => {
                    resolve(rows[0][0]["value"])
                }
            );

            connection.execSql(request);
        });
    }

    static async set_prefix(connection, guild_id, prefix) {
        return new Promise((resolve, reject) => {
            const updateRequest = new Request(
                `UPDATE prefixes
            SET prefix = '${prefix}' 
            WHERE ID = ${guild_id};`
                , (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log("Changed a server's prefix!")
                    }
                }
            );

            connection.execSql(updateRequest)
            resolve()
        });
    }

    static async add_prefix(connection, guild_id, prefix) {
        return new Promise((resolve, reject) => {
            const insertRequest = new Request(
                `INSERT INTO prefixes (ID, prefix)
            VALUES (${guild_id}, '${prefix}');`
                , (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log("Added a new server's prefix!")
                    }
                }
            );

            connection.execSql(insertRequest)
            resolve()
        });
    }

};