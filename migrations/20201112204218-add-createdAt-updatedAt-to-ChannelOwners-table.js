'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('ChannelOwners', 'createdAt', {
            allowNull: false,
            defaultValue: Sequelize.NOW,
            type: Sequelize.DATE,
        });
        await queryInterface.addColumn('ChannelOwners', 'updatedAt', {
            allowNull: false,
            defaultValue: Sequelize.NOW,
            type: Sequelize.DATE,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('ChannelOwners', 'createdAt');
        await queryInterface.removeColumn('ChannelOwners', 'updatedAt');
    },
};
