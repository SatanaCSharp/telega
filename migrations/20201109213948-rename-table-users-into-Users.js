'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameTable('users', 'Users');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameTable('Users', 'users');
    },
};
