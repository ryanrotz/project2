'use strict';
module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define('item', {
    name: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.item.belongsToMany(models.board, {through: "boardsItems"});
        models.item.belongsToMany(models.color, {through: "itemsColors"});
      }
    }
  });
  return item;
};
