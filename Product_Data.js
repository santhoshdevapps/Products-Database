/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	//  Name : Santhosh Damodharan
	//     student Id : 300964037
	//     File Name : Product_data.js
	//     Description : Created product database to store & maintain all the products in the store
	//     version : 1.0
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var SERVER_NAME = 'Product-api'
var PORT = 8000;
var HOST = '127.0.0.1';


var getRequestCounter = 0;
var postRespnseCounter = 0;


var restify = require('restify')

  // Get a persistence engine for the users
  , productsSave = require('save')('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  //console.log('Server %s listening at %s', server.name, server.url)
  console.log("Server is listening on: " + HOST + ":" + PORT);
  console.log("End Points :");
  console.log( HOST + ":" + PORT +"/products   method: GET");
  console.log( HOST + ":" + PORT +"/products   method: POST");
  console.log( HOST + ":" + PORT +"/products   method: DELETE");
  })

server
// Allow the use of POST
.use(restify.fullResponse())

// Maps req.body to req.params so there is no switching between them
.use(restify.bodyParser())



/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
                       // Create a new product
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
server.post('/products', function (req, res, next) {
  
      console.log("productPost: sending response...");
    
      //Request counter for productPostrequest 
      postRespnseCounter++;
      
      console.log("Processed Request Counter -> productGet : " + getRequestCounter + ", productPost : " + postRespnseCounter);
        
    // Make sure name is defined
    if (req.params.name === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('name must be supplied'))
    }
    if (req.params.price === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('price must be supplied'))
    }
    var newProduct = { 
          name: req.params.name, 
          price: req.params.price,
          _id: req.params._id
      }
  
    // Create the user using the persistence engine
    productsSave.create( newProduct, function (error, product) {


      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send the user if no issues
      res.send(201, product)
    })
  })


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
                      // Get all product records in the system
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

        server.get('/products', function (req, res, next) {
  
        console.log("productGet: received request..");

        //Request counter for endpoint sendGet 
        getRequestCounter++;
        
        console.log("Processed Request Counter -> productGet : " + getRequestCounter + ", productPost : " + postRespnseCounter);
          

        // Find every entity within the given collection
        productsSave.find({}, function (error, products) {

        // Return all of the Staffs in the system
        //res.send(staffs)


        console.log(products);

         res.send(products);

       })
    })
    
	/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
                      // Get a single product by their product id
	/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

      server.get('/products/:id', function (req, res, next) {

        // Find a single user by their id within save
        productsSave.findOne({ _id: req.params.id }, function (error, products) {
    
          getRequestCounter++;
          
          console.log("Processed Request Counter -> productGet : " + getRequestCounter + ", productPost : " + postRespnseCounter);
          
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        if (products) {
          // Send the user if no issues
          res.send(products)
        } else {
          // Send 404 header if the user doesn't exist
          res.send(404)
        }
      })
    })


	/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
                       // Delete product record with the given id
	/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

server.del('/products/:id', function (req, res, next) {
  
    // Delete the user with the persistence engine
    productsSave.delete(req.params.id, function (error, product) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send a 200 OK response
      res.send(200)
    })
  })
  
	/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
                      // Delete all product records in the system
	/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

server.del('/products', function (req, res, next) {
  
        console.log("productDelete: received request..");

        // Find every entity within the given collection

        //productsSave.delete({}, function (error, product) {
          

        productsSave = require('save')('products')

        res.send("All Records Delete");
    //    localStorage.clear();
        
      //    fs.truncate(filename, 0, function(){console.log('delete.')})

 //      Send a 200 OK response
       })