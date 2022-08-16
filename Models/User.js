const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create User model
class User extends Model {
    //set up method to run on instance data (per user) to check password
    checkPassword (loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        hooks: {
            //set up beforeCreate lifecycle 'hook' functionality
            async beforeCreate (newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //set up beforeUpdate lifecycle 'hook' functionality
            async beforeUpdate (updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        //TABLE CONFIG OPTIONS GO HERE ((https://sequelize.org/v5/manual/models-definition.html#configuration))

        sequelize,

        timestamps: false,

        freezeTableName: true,

        underscored: true,

        modelName: 'user'
    },


);

module.exports = User;
