'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Deals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            AdvertisingProviderId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'AdvertisingProviders',
                    key: 'id',
                },
                onDelete: 'CASCADE',
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
            AdvertisementId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Advertisements',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            ChannelId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Channels',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: false,
                allowNull: false,
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

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Deals');
    },
};
