module.exports = (sequelize, Sequelize) => {
    const Holds = sequelize.define(
        'holds',
        {
            pxs: {
                type: Sequelize.TEXT,
            },
            pys: {
                type: Sequelize.TEXT,
            },
        },
        {
            timestamps: true, //Auto createdAt & updatedAt
        }
    )

    return Holds
}
