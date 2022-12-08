'use strict';
const {
  Model
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
      Book.belongsTo(models.Profile)
    }
    hassing() {
      let length = this.title.length
      let title = this.title.split(' ')
      let genre = this.genre
      let publish = this.publish.toLocaleDateString().split('/').join('')
      return `${genre}.${title[0]}.${publish}.${length}`
    }
  }
  Book.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    bookCode: DataTypes.STRING,
    publish: DataTypes.DATE,
    description: DataTypes.TEXT,
    ProfileId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (book) => {
        book.bookCode = book.hassing()
      }
    },
    sequelize,
    modelName: 'Book',
  });
  return Book;
};