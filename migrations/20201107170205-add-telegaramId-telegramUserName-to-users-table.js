'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'telegramId',{
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: true,
        });
        await queryInterface.addColumn('users', 'telegramUserName',{
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'telegramId');
        await queryInterface.removeColumn('users', 'telegramUserName');
    },
};
