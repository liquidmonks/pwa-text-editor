const Sequelize = require('sequelize');
const sequelize = require('../db');

const Service = sequelize.define('Service', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    authenticationCode: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    xmlName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Service;
