const mongoose = require('mongoose');

const URL = "mongodb+srv://Arshie13:Iammak@findadonor.rfbzl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DBNAME = "find-a-donor";

const connectDB = async () => {
  try {
    await mongoose.connect(`${URL}`, {
      dbName:DBNAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
  } catch (error) {
    console.log('Not able to connect to the database' + error);
  }
};

mongoose.connection.on('connected', () => {
  console.log("Connection Established");
});

mongoose.connection.on('reconnected', () => {
  console.log("Reconnected to the Database");
});

mongoose.connection.on('disconnected', () => {
  console.log("Disconnected");
});

mongoose.connection.on('error', (error) => {
  console.log("Disconnected"+error);
});

process.on('SIGINT', () => {
  mongoose.connection.close(function () {
    console.log('Database disconnected because app terminated');
    process.exit(0);
  })
})

module.exports = connectDB;