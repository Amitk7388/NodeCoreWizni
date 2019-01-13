const Manager = require('../models/manager');
const Employee = require('../models/employee')

// this the create manager function where data will post from the form
function createManager(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:''  
    };

    let body = JSON.parse(req.body);
    console.log(body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    //lets validate the form
    if(!body.firstName || !body.email ){
        giveMessage.message = 'Missing Field Required'
        
        return res.end(JSON.stringify(giveMessage))
    }

    //finding the email id does exist or not in database if exist throw required unique mail id 
    Manager.findOne({email:body.email}, function(err, manager){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
        
            return res.end(JSON.stringify(giveMessage))
        }
        if(manager){
            giveMessage.message = "Email id already Exist"
        
            return res.end(JSON.stringify(giveMessage))
        }

        // creating the object of the new manager 
        var newManager = new Manager({
            firstName : body.firstName,
            lastName  : body.lastName ? body.lastName :'',
            email     : body.email
        });

        // pushing into database
        Manager.createManager(newManager, function(err, managerCreated){
            if(err){
                giveMessage.message = "error while creating the user. Please try again"
        
                return res.end(JSON.stringify(giveMessage))
            }else{
                giveMessage.message  = "Manager created succesfully";
                giveMessage.response = managerCreated;
                giveMessage.success  = true
        
                return res.end(JSON.stringify(giveMessage))
            }
        })
    })


}




// get One User
function getOneManager(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:''
        
    };

    let body = JSON.parse(req.body);
    console.log(body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    //lets validate the form
    if(!body.managerId){
        giveMessage.message = 'Missing Field Required'
        return res.end(JSON.stringify(giveMessage))
    };

    Manager.findById(body.managerId, function(err, managerfind){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
            giveMessage.message  = "Manager One found succesfully";
                giveMessage.response = managerfind;
                giveMessage.success  = true
                return res.end(JSON.stringify(giveMessage))
        }
    })
}


// lets find all the data of manager
function getAllManager(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:''  
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    //lets find the details
    Manager.find({}, function(err, data){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
                giveMessage.message  = "Managers found succesfully";
                giveMessage.response = data;
                giveMessage.success  = true
        
                return res.end(JSON.stringify(giveMessage))
        }
    })
}




// update the managers details

function updateManager(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:''
        
    };

    let body = JSON.parse(req.body);
    console.log(body);
    console.log(body.firstName)
    console.log(body.lastName)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    //lets validate the form
    if(!body.managerId){
        giveMessage.message = 'Missing Field Required'
        
        return res.end(JSON.stringify(giveMessage))
    }

    //finding the email id does exist or not in database if exist throw required unique mail id 
    Manager.findById(body.managerId, function(err, manager){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
             return res.end(JSON.stringify(giveMessage))
        }
        else if(!manager){
            giveMessage.message = "Manager not found!"
            return res.end(JSON.stringify(giveMessage))
        }else{
            console.log(body.firstName)
            console.log(body.lastName)
            let updateManager = {
                firstName : body.firstName ? body.firstName: manager.firstName,
                lastName : body.lastName ? body.lastName : manager.lastName
            }
            console.log(updateManager)

            Manager.findByIdAndUpdate(body.managerId, updateManager,{new:true} ,function(err, updated){
                if(err){
                    giveMessage.message = "error while updating the user. Please try again"
                     return res.end(JSON.stringify(giveMessage))
                }else{
                    console.log('here is one')
                    giveMessage.message  = "Manager updated succesfully";
                    giveMessage.response = updated;
                    giveMessage.success  = true
        
                return res.end(JSON.stringify(giveMessage))
                }
            })
        }
        
    })

}




// deleting the user Api
function deleteManager(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:''
        
    };

    let body = JSON.parse(req.body);
    console.log(body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    //lets validate the form
    if(!body.managerId){
        giveMessage.message = 'Missing Field Required'
        return res.end(JSON.stringify(giveMessage))
    };
    // deleting the user
    Manager.findByIdAndRemove(body.managerId, function(err, managerfind){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
            giveMessage.message  = "Manager delete succesfully";
                giveMessage.response = managerfind;
                giveMessage.success  = true
                return res.end(JSON.stringify(giveMessage))
        }
    })
}



//lets check how many employess are there under this manager
function empManager(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:''  
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    let body = JSON.parse(req.body);
    console.log(body);
    
    if(!body.managerId){
        giveMessage.message = 'Missing Field Required'
        return res.end(JSON.stringify(giveMessage))
    };
    //lets find the details
    Employee.find({managerId :body.managerId}, function(err, data){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
                giveMessage.message  = "Managers found succesfully";
                giveMessage.response = data;
                giveMessage.success  = true
        
                return res.end(JSON.stringify(giveMessage))
        }
    })
}


module.exports ={
    createManager,
    getOneManager,
    getAllManager,
    updateManager,
    deleteManager,
    empManager
}