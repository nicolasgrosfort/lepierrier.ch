module.exports = (sequelize, Sequelize) => {
    const Paths = sequelize.define(
        'paths',
        {
            type: Sequelize.STRING,
        },
        {
            timestamps: false, //Auto createdAt & updatedAt
        }
    )

    return Paths
}
