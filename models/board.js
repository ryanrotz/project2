'use strict';
module.exports = function(sequelize, DataTypes) {
  var board = sequelize.define('board', {
    color_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.board.belongsToMany(models.user, {through: "usersBoards"});
        models.board.belongsToMany(models.item, {through: "boardsItems"});
        models.board.belongsTo(models.color);
      }
    }
  });
  return board;
};
