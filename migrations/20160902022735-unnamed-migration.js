'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
    'documents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      language: {
        type: Sequelize.STRING,
          allowNull: false
      },
    }
    )
  },


  down: function (queryInterface, Sequelize) {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.
      return queryInterface.dropTable('documents');
      // Example:
      // return queryInterface.dropTable('users');
    
  }
};