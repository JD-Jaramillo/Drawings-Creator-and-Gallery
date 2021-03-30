const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const cloudinary = require('cloudinary');

class Drawing extends Model { }

Drawing.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        pic: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        cloudinary,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'drawing',
    }
);


module.exports = Drawing;