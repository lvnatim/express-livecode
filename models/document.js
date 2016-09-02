'use strict';
module.exports = function(sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    owned_id: DataTypes.INTEGER,
    language: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Document;
};