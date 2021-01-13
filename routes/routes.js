const user = require('./user');
const {sendSuccess} = require("../utils/responseHandler")

const routes = (app) => {

  app.get('/', (req, res) => {
    return sendSuccess(res, {}, "Hello World!", 200)
  });

  //user route handler
  app.use("/api", user())
}

module.exports = routes;
