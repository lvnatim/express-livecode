'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Document);
      }
    }
  });
  sequelize.sync();
  return Comment;
};