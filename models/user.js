'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Comment);
        User.belongsToMany(models.Document, {
          through: {
            model: 'UserDocuments'
          },
          foreignKey: 'userID'
        });
      }
    }  
  });
  return User;
};