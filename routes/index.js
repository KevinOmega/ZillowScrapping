var express = require('express');
var router = express.Router();
// const app = express();
const data = require("./data");

/* GET home page. */
module.exports = function(app){
  router.use("/data",data)


  app.use("/api",router);
}

