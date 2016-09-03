'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('Users', 
      [{email: 'billy@bob.com', firstName: 'Billy', lastName: 'Bob', password: '123456', createdAt: new Date(), updatedAt: new Date()},
      {email: 'janedoe@doe.com', firstName: 'Jane', lastName: 'Doe', password: '123456', createdAt: new Date(), updatedAt: new Date()},
      {email: 'janedoe@doe.com', firstName: 'Jane', lastName: 'Doe', password: '123456', createdAt: new Date(), updatedAt: new Date()}]
      );
  },

  down: function (queryInterface, Sequelize) {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('User', null, {});
    
  }
};
