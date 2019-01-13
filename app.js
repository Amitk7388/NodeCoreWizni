const mongoose = require('mongoose');
const http = require('http')

const popEmployee = require('./routes/employees');
const popProject = require('./routes/projects');
const popManager = require('./routes/managers');

// lets connect to mongodb for data saving and manipulation
mongoose.connect('mongodb://localhost:27017/projectemp', {useNewUrlParser:true}, function(err, done){
    if(err){
        console.log(err)
    }else{
        console.log('database connected')
    }
})


// In this function we will create the methods , req.body and will create the routes or api
function letRequest(req, res){
    const {header, method, url} = req

    let body = []; // this where data will come from post in array 
    
    //let push the data into it
    req.on('error', function(err){
        console.log(err); // if error
    }).on('data', function(chunkData){
        body.push(chunkData); // pushing the data in the body
    }).on('end', function(){
        body = Buffer.concat(body).toString();

        // Now here we will get method, url and body and now we can make req.body
        req.body = body;
         // now lets create the routes
         if(req.url == '/'){
             res.writeHead(200, {'content-type' : 'text/plain'});
             res.end('welcome to the project');
             console.log('home is working');
         }
         
         //this is for employe api's
         else if(req.url == '/employee/create/api' && req.method === "POST"){
            popEmployee.createUser(req, res)
         }
         else if(req.url == '/employee/getone/api' && req.method === "POST"){
             popEmployee.getOneUser(req, res)
         }
         else if(req.url == '/employee/getall/api' && req.method === "GET"){
             popEmployee.getAllUser(req, res)
         }
         else if(req.url == '/employee/update/api' && req.method === "POST"){
             popEmployee.updateUser(req, res)
         }
         else if(req.url == '/employee/delete/api' && req.method == "POST"){
            popEmployee.deleteUser(req, res)
         }

         //for Managers api's
         else if(req.url =='/manager/create/api'   && req.method == "POST"){
             popManager.createManager(req, res)
        }
         else if(req.url =='/manager/getone/api'   && req.method == "POST"){
             popManager.getOneManager(req, res)
        }
         else if(req.url =='/manager/getall/api'   && req.method == "GET"){
             popManager.getAllManager(req, res)
        }
         else if(req.url =='/manager/update/api'   && req.method == "POST"){
             popManager.updateManager(req, res)
        }
         else if(req.url =='/manager/delete/api'   && req.method == "POST"){
             popManager.deleteManager(req, res)
        }
        else if(req.url =='/manager/employees/api'   && req.method == "POST"){
            popManager.empManager(req, res)
       }
        
        // here for projects url or api's
        else if(req.url == '/project/create/api'   && req.method === "POST"){
            popProject.createProject(req, res)
        }
        else if(req.url == '/project/getone/api'   && req.method === "POST"){
            popProject.getOneProject(req, res)
        }
        else if(req.url == '/project/getall/api'   && req.method === "GET"){
            popProject.getAllProject(req, res)
        }
        else if(req.url == '/project/update/api'   && req.method === "POST"){
            popProject.updateProject(req, res)
        }
        else if(req.url == '/project/delete/api'   && req.method === "POST"){
            popProject.deleteProject(req, res)
        }

        //if url will not found then will show the 404
        else {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Not found!");
		}
    })
}

// creating the https localhost with port
const PORT = 8686
http.createServer(letRequest).listen(PORT, function(){
    console.log(`server is working ${PORT}` )
})