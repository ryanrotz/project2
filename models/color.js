'use strict';
module.exports = function(sequelize, DataTypes) {
  var color = sequelize.define('color', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.color.belongsToMany(models.item, {through: "itemsColors"});
      }
    }
  });
  return color;
};
