const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campaign = sequelize.define('Campaign', {
  campaignName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  leads: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Campaign;
