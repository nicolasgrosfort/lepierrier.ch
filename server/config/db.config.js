module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PORT: '8889',
    PASSWORD: 'root',
    DB: 'lepierrier',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}
