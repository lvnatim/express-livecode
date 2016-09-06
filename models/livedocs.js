'use strict';
module.exports = function(sequelize, DataTypes) {
  var LiveDocs = sequelize.define('LiveDocs', {
    document_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LiveDocs;
};