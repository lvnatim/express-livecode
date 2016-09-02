'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  //will add new user to database on connect
//   User.sync({force: true}).then(function(){
//   User.create({
//     email: 'john@doe.com',
//     firstName: 'John',
//     lastName: 'Doe',
//     password: '123456'
//   })
// })
  return User;
};

