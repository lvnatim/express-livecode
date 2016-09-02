'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
    'permissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      return queryInterface.dropTable('permissions');
      // Example:
      // return queryInterface.dropTable('users');
    
  }
};