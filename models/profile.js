'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Profile.hasMany(models.Book)
      Profile.belongsTo(models.User)
      // Profile.hasMany(models.Like)
    }
  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty"
        },
        notNull: {
          msg: "Name cannot be empty"
        }
      } 
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Gender cannot be empty"
        },
        notNull: {
          msg: "Gender cannot be empty"
        }
      } 
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Profile Picture cannot be empty"
        },
        notNull: {
          msg: "Profile Picture cannot be empty"
        }
      } 
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};