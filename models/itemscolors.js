'use strict';
module.exports = function(sequelize, DataTypes) {
  var itemsColors = sequelize.define('itemsColors', {
    itemId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return itemsColors;
};