const mongoose = require('mongoose');
const dsn = process.env.DB_DEV;

const InitiateMongoServer = async () => {
  if(process.env.NODE_ENV === 'test'){
    try {
      await mongoose.connect("mongodb://localhost:27017/test-simple-api", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log('Connected to DB');
    } catch (err) {
      console.error(err);
      throw err;
    }
  } else {
    try {
      await mongoose.connect(dsn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log('Connected to DB');
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

const close = () => {
  console.log("Disconnected from DB")
  return mongoose.disconnect();
}
module.exports = { InitiateMongoServer, close };
