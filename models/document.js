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
        Document.hasMany(models.Comment)
        Document.belongsToMany(models.User, 
          {
            through: {
              model: 'UserDocuments'
            },
            foreignKey: 'docID'
          });
      }
    }
  });
  sequelize.sync();
  return Document;
};