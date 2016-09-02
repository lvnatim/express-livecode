//Sequelize set up and connection 
var Sequelize = require('sequelize');

var sequelize = new Sequelize('expresscode', 'development', 'development', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(function(err){
    console.log('Connection to postgres has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

//application-wide models - note: you must have corresponding fields in your 'bookstore' database to avoid errors
var User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING
  }
});

var Document = sequelize.define('document', {
  name: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  owner_id: {
    type: Sequelize.INTEGER
  },
  language: {
    type: Sequelize.STRING
  }
});

var Comment = sequelize.define('comment', {
  content: {
    type: Sequelize.STRING
  }
});

//For future reference:
  //This will create a new model called UserDocument with the equivalent foreign keys 
  //documentID and userID

// Document.belongstoMany(User, {through: 'UserDocument'});
// User.belongstoMany(Document, {through: 'UserDocument'});
// Comment.belongsto(Document);
// Comment.belongsto(User);

// Test to check connection is correct(must have Document table with something in it to work:
// Document.findOne().then(function (doc) {
//     console.log(doc.get(doc));
// });

module.exports = sequelize;