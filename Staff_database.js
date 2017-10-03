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

server
// Allow the use of POST
.use(restify.fullResponse())

// Maps req.body to req.params so there is no switching between them
.use(restify.bodyParser())


//------------------------------------------------------------------------------//
                       // Create a new staff record
//------------------------------------------------------------------------------//
server.post('/sendPost', function (req, res, next) {
  
      console.log("sendPost: sending response...");
    
      //Request counter for sendPostrequest 
      postRespnseCounter++;
      
      console.log("Processed Request Counter -> sendGet : " + getRequestCounter + ", sendPost : " + postRespnseCounter);
        
    // Make sure name is defined
    if (req.params.name === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('name must be supplied'))
    }
    if (req.params.age === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('age must be supplied'))
    }
    var newStaff = { 
          name: req.params.name, 
          age: req.params.age,
          _id: req.params._id
      }
  
    // Create the user using the persistence engine
    staffsSave.create( newStaff, function (error, staff) {
  
      //Writing data in JSON file

        staff_data_JSON[req.params.name] = req.params.age;
      
        var write_data = JSON.stringify(staff_data_JSON,null,2);

        fs.writeFile(filename,write_data,finished);

        function finished(err) {console.log('Data stored in json file');}

      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send the user if no issues
      res.send(201, staff)
    })
  })

