'use strict';
module.exports = function(sequelize, DataTypes) {
  var board = sequelize.define('board', {
    colorId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.board.belongsTo(models.user);
        models.board.belongsToMany(models.item, {through: "boardsItems"});
        models.board.belongsTo(models.color);
      }
    }
  });
  return board;
};
