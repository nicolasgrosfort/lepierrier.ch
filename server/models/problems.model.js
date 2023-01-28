module.exports = (sequelize, Sequelize) => {
    const Problems = sequelize.define(
        'problems',
        {
            name: {
                type: Sequelize.STRING,
            },
            grade: {
                type: Sequelize.STRING,
            },
            setter: {
                type: Sequelize.STRING,
            },
            date: {
                type: Sequelize.DATE,
            },
            rate: {
                type: Sequelize.INTEGER,
            },
            done: {
                type: Sequelize.INTEGER,
            },
            feet: {
                type: Sequelize.BOOLEAN,
            },
        },
        {
            timestamps: true, //Auto createdAt & updatedAt
        }
    )

    return Problems
}
