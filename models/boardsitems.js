'use strict';
module.exports = function(sequelize, DataTypes) {
  var boardsItems = sequelize.define('boardsItems', {
    boardId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return boardsItems;
};