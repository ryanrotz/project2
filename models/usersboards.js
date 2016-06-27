'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersBoards = sequelize.define('usersBoards', {
    userId: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersBoards;
};
