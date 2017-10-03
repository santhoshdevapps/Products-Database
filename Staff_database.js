var SERVER_NAME = 'Staff-api'
var PORT = 3000;
var HOST = '127.0.0.1';

var filename = 'Staff_Database.json';
var fs = require('fs');

var data = fs.readFileSync(filename);
var student_data_JSON = JSON.parse(data);


var getRequestCounter = 0;
var postRespnseCounter = 0;


var restify = require('restify')

  // Get a persistence engine for the users
  , staffsSave = require('save')('staffs')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  //console.log('Server %s listening at %s', server.name, server.url)
  console.log("Server is listening on: " + HOST + ":" + PORT);
  console.log("End Points :");
  console.log( HOST + ":" + PORT +"/sendGet   method: GET");
  console.log( HOST + ":" + PORT +"/sendPost   method: POST");
  console.log( HOST + ":" + PORT +"/sendDelete   method: DELETE");
  
  console.log(staff_data_JSON);

  console.log('Resources:')
  console.log(' /staffs')
  console.log(' /staffs/:id')  
})
