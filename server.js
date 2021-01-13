require('dotenv').config();
const express = require('express');
const morgan = require("morgan")
const routes = require('./routes/routes');
const { InitiateMongoServer } = require('./config/db');
const logger = require("./config/winston");

//Instantiate app
const app = express();

//Initiate Mongo Server
InitiateMongoServer();

//Express Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined", {stream:logger.stream}));

// Read the port from the environment
const port = process.env.PORT;

//Routes
routes(app);


//Error handler
//Capture 404 errors
app.use((req, res, next) => {
  logger.error(`${res.status || 400} - ${res.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404).send("Page not found");
});


//Capture 500 errors
app.use((error, req, res, next) => {
  logger.error(`${error.status || 500} - ${error.message} - ${error.message} - ${req.method} - ${req.ip}`);
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
})

// Start a TCP server listening for connections on the given port and host
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    logger.info(`Server running at http://localhost:${port}/`)
  });
}

module.exports = app;
