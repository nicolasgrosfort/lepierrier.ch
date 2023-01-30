const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.holds = require('./holds.model.js')(sequelize, Sequelize)
db.problems = require('./problems.model.js')(sequelize, Sequelize)
db.paths = require('./paths.model.js')(sequelize, Sequelize)

db.holds.belongsToMany(db.problems, { through: db.paths })
db.problems.belongsToMany(db.holds, { through: db.paths })

db.holds.sync()
db.problems.sync()
db.paths.sync()

module.exports = db
