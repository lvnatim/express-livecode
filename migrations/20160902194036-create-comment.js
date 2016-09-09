'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'Comments', 
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        line: {
          type: Sequelize.INTEGER
        },

        content: {
          type: Sequelize.STRING
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },

        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },

        UserId: {
          type: Sequelize.INTEGER,
          foreignKey: true
        },

        DocumentId: {
          type: Sequelize.INTEGER,
          foreignKey: true
        }

      });
    },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Comments');
  }
};