const { Connection, Request } = require("tedious");
const Chalk = require("chalk")
const fs = require("fs")

module.exports = class Database {
    /*
     * Authenticate into the database.
     */
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

    /*
     * =========================
     * Prefix Related Functions
     * =========================
     */ 
    static get_prefix(connection, guild_id) {
        return new Promise((resolve, reject) => {
            const request = new Request(
                `SELECT prefix FROM prefixes WHERE id = ${guild_id}`
                , (err, rowCount, rows) => {
                    if (rowCount == 0 || rowCount == null || rowCount == undefined) { 
                        resolve(undefined) 
                    } else {
                        resolve(rows[0][0]["value"])
                    }
                }
            );

            connection.execSql(request);
        });
    }

    static set_prefix(connection, guild_id, prefix) {
        return new Promise((resolve, reject) => {
            const updateRequest = new Request(
                `UPDATE prefixes
            SET prefix = '${prefix}' 
            WHERE ID = ${guild_id};`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Changed a server's prefix!")
                        resolve()

                    }
                }
            );

            connection.execSql(updateRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Set guild id ${guild_id}'s prefix to ${prefix}\n`);
        });
    }

    static add_prefix(connection, guild_id, prefix) {
        return new Promise((resolve, reject) => {
            const insertRequest = new Request(
                `INSERT INTO prefixes (ID, prefix)
            VALUES (${guild_id}, '${prefix}');`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Added a new server's prefix!")
                        resolve()
                    }
                }
            );

            connection.execSql(insertRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Set up prefix ${prefix} of server id ${guild_id}\n`);
        });
    }

    /*
     * =========================
     * Coins Related Functions
     * =========================
     */ 
    static async init_coins(connection, user_id) {
        return new Promise((resolve, reject) => {
            const insertRequest = new Request(
                `INSERT INTO coins
            VALUES (${user_id}, 10000);`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Started account of new user's coins.")
                        resolve()
                    }
                }
            );

            connection.execSql(insertRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Initialized user id ${user_id}'s coins.\n`);
        });
    }

    static async delete_coins(connection, user_id) {
        return new Promise((resolve, reject) => {
            const insertRequest = new Request(
                `DELETE FROM coins WHERE ID = ${user_id}`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Deleted coins records of user")
                        resolve()
                    }
                }
            );

            connection.execSql(insertRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Deleted coins records of user id ${user_id}.\n`);
        });
    }

    static async get_coins(connection, user_id) {
        return new Promise((resolve, reject) => {
            const request = new Request(
                `SELECT count FROM coins WHERE id = ${user_id}`
                , (err, rowCount, rows) => {
                    try {
                        resolve(rows[0][0]["value"])
                    }
                    catch {
                        resolve(undefined)
                    }
                }
            );

            connection.execSql(request);
        });
    }

    static async set_coins(connection, user_id, coins) {
        return new Promise((resolve, reject) => {
            const updateRequest = new Request(
                `UPDATE coins
            SET count = '${coins}' 
            WHERE ID = ${user_id};`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Changed a user's coins!")
                        resolve()
                    }
                }
            );

            connection.execSql(updateRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Changed ${user_id}'s coins to ${coins}\n`);
        });
    }

    static async add_coins(connection, user_id, coins) {
        return new Promise((resolve, reject) => {
            const updateRequest = new Request(
                `UPDATE coins
            SET count = count + '${coins}' 
            WHERE ID = ${user_id};`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Added a user's coins!")
                        resolve()
                    }
                }
            );

            connection.execSql(updateRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Increased ${user_id}'s coins by ${coins}\n`);
        });
    }
    /*
     * =========================
     * Gems Related Functions
     * =========================
     */ 

    static async init_gems(connection, user_id) {
        return new Promise((resolve, reject) => {
            const insertRequest = new Request(
                `INSERT INTO gems
            VALUES (${user_id}, 100);`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Started account of new user's gems.")
                        resolve()
                    }
                }
            );

            connection.execSql(insertRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Initialized user id ${user_id}'s gems.\n`);
        });
    }

    static async delete_gems(connection, user_id) {
        return new Promise((resolve, reject) => {
            const insertRequest = new Request(
                `DELETE FROM gems WHERE ID = ${user_id}`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Deleted gems records of user")
                        resolve()
                    }
                }
            );

            connection.execSql(insertRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Deleted gems records of user id ${user_id}.\n`);
        });
    }

    static async get_gems(connection, user_id) {
        return new Promise((resolve, reject) => {
            const request = new Request(
                `SELECT count FROM gems WHERE id = ${user_id}`
                , (err, rowCount, rows) => {
                    try {
                        resolve(rows[0][0]["value"])
                    }
                    catch {
                        resolve(undefined)
                    }
                }
            );

            connection.execSql(request);
        });
    }

    static async set_gems(connection, user_id, gems) {
        return new Promise((resolve, reject) => {
            const updateRequest = new Request(
                `UPDATE gems
            SET count = '${gems}' 
            WHERE ID = ${user_id};`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Changed a user's gems!")
                        resolve()
                    }
                }
            );

            connection.execSql(updateRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Changed ${user_id}'s gems to ${gems}\n`);
        });
    }

    static async add_gems(connection, user_id, gems) {
        return new Promise((resolve, reject) => {
            const updateRequest = new Request(
                `UPDATE gems
            SET count = count + '${gems}' 
            WHERE ID = ${user_id};`
                , (err) => {
                    if (err) {
                        console.error(err)
                        resolve()
                    } else {
                        console.log("Added a user's gems!")
                        resolve()
                    }
                }
            );

            connection.execSql(updateRequest)

            fs.appendFileSync(`./logs/databaselog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Increased ${user_id}'s gems by ${gems}\n`);
        });
    }
};