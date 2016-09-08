'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('Users', 
      [{username: 'bob', email: 'billy@bob.com', firstName: 'Billy', lastName: 'Bob', password: '123456', createdAt: new Date(), updatedAt: new Date()},
      {username: 'jane', email: 'janedoe@doe.com', firstName: 'Jane', lastName: 'Doe', password: '123456', createdAt: new Date(), updatedAt: new Date()},
      {username: 'john', email: 'johndoe@doe.com', firstName: 'John', lastName: 'Doe', password: '123456', createdAt: new Date(), updatedAt: new Date()}]
      );
  },

  down: function (queryInterface, Sequelize) {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('User', null, {});
    
  }
};
