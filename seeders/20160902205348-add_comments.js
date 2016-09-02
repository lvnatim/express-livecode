'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    

      return queryInterface.bulkInsert('Comments', 
      [{content: 'Great code here!', createdAt: new Date(), updatedAt: new Date()},
      {content: 'This section needs to be reworked', createdAt: new Date(), updatedAt: new Date()},
      {content: 'Use a for loop!', createdAt: new Date(), updatedAt: new Date()}]
      );
  },

  down: function (queryInterface, Sequelize) {
    
      return queryInterface.bulkDelete('Comments', null, {});
    
  }
};
