var mongoose = require('mongoose');
var config = require('./index');

mongoose.set('strictQuery', false);

async function connectDB() {
    try {
      await mongoose.connect(`${config.dbUrl}/${config.dbName}`);
      console.log('DB connection success.');
    } catch (err) {
      console.log('Error in connecting to db.', err);
    }
  }
  
  connectDB();