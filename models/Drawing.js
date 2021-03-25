const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Drawing extends Model { }


module.exports = Drawing;