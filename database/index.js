const mongoose = require('mongoose');

// const URL = "mongodb+srv://Arshie13:Iammak@findadonor.rfbzl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const URL =
	"mongodb://find-a-donor-db:14zJu0zBkMNLG7ILciwF46ENszcbxpkVs43RJEQ59bF9wKYVhlRy0vh2tPqNddb6Z93hdSzWdf6cS7VXOf1ynA==@find-a-donor-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@find-a-donor-db@";
// 
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
