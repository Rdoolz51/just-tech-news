const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model
class User extends Model { }

//define table columns and config
User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        id: {
            //use the special Sequelize DataTypes object. Provide what type of data it is
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            //if allowNull is set to false, we can run out data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means that the password must have a length of at least 4 characters
                len: [4]
            }
        }

    },
    {
        //TABLE CONFIG OPTIONS GO HERE ((https://sequelize.org/v5/manual/models-definition.html#configuration))

        sequelize,

        timestamps: false,

        freezeTableName: true,

        underscored: true,

        modelName: 'user'
    }
);

module.exports = User;
