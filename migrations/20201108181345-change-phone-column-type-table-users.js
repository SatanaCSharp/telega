'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('users', 'phone', {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('users', 'phone', {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
        });
    },
};
