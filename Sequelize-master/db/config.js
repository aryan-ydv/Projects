const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("testdb", "root", "", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.sync({
    logging: console.log,

    force: false
}).then(() => {
    console.log("connection of database Successfully")
}).catch(err => {
    console.log("Unable to connect to dtabase", err);
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;