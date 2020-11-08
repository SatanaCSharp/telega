'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('users', 'email', {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
        });

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('users', 'email', {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        });
    },
};
