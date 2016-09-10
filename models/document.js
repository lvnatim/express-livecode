'use strict';
module.exports = function(sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'untitled'
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'javascript'
    }
  }, {
    classMethods: {
      associate: function(models) {
        Document.belongsTo(models.User, {as: "Owner"});
        Document.hasMany(models.Comment);
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