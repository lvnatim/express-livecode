'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
    'comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userID: {
        type: Sequelize.INTEGER
      },
      documentID: {
        type: Sequelize.INTEGER
      }
    }
    )
  },


  down: function (queryInterface, Sequelize) {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.
      return queryInterface.dropTable('comments');
      // Example:
      // return queryInterface.dropTable('users');
    
  }
};