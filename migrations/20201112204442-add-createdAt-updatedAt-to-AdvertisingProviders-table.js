'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('AdvertisingProviders', 'createdAt', {
            allowNull: false,
            defaultValue: Sequelize.NOW,
            type: Sequelize.DATE,
        });
        await queryInterface.addColumn('AdvertisingProviders', 'updatedAt', {
            allowNull: false,
            defaultValue: Sequelize.NOW,
            type: Sequelize.DATE,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('AdvertisingProviders', 'createdAt');
        await queryInterface.removeColumn('AdvertisingProviders', 'updatedAt');
    },
};
