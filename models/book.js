'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.User)
      Book.hasMany(models.Like)
    }
    hassing() {
      let length = this.title.length
      let title = this.title.split(' ')
      let genre = this.genre
      let publish = this.publish.toLocaleDateString().split('/').join('')
      return `${genre}.${title[0]}.${publish}.${length}`
    }

    static searchTitleBook(search, Profile, Like, User) {
      let option = {
        include: [
            {
              model: User,
              include: {
                model: Profile
              }
            },
            {model: Like}
        ]
      }
      
      if (search) {
        option.where = {
            title: {
                [Op.iLike]: `%${search}%`
            }
          }
        }
        
        return Book.findAll(option)
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty"
        },
        notNull: {
          msg: "Title cannot be empty"
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Genre cannot be empty"
        },
        notNull: {
          msg: "Genre cannot be empty"
        }
      }
    },
    bookCode: DataTypes.STRING,
    publish: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Publish cannot be empty"
        },
        notNull: {
          msg: "Publish cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description cannot be empty"
        },
        notNull: {
          msg: "Description cannot be empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (book) => {
        book.bookCode = book.hassing()
      },
      beforeUpdate: (book) => {
        book.bookCode = book.hassing()
      }
    },
    sequelize,
    modelName: 'Book',
  });
  return Book;
};