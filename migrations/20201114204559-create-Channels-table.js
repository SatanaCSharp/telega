'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Channels', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
            },
            participantsCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            postsCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            priceRate: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            ChannelOwnerId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'ChannelOwners',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.NOW,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.NOW,
                type: Sequelize.DATE,
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Channels');
    },
};
