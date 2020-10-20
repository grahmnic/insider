'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.init({
    title: DataTypes.STRING(50),
    author: DataTypes.STRING(50),
    publication_date: DataTypes.DATE,
    body: DataTypes.STRING(1000)
  }, {
    sequelize,
    modelName: 'Article',
  });
  
  return Article;
};