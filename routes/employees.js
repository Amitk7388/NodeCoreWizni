const Employee = require('../models/employee')
const Manager = require('../models/manager')
function createUser(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:'' ,
        Manager : {}
    };

    let body = JSON.parse(req.body);
    console.log(body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    //lets validate the form
    if(!body.firstName || !body.email || !body.managerId ){
        giveMessage.message = 'Missing Field Required'
        
        return res.end(JSON.stringify(giveMessage))
    }

    //finding the email id does exist or not in database if exist throw required unique mail id 
    Employee.findOne({email:body.email}, function(err, employee){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
        
            return res.end(JSON.stringify(giveMessage))
        }
        if(employee){
            giveMessage.message = "Email id already Exist"
        
            return res.end(JSON.stringify(giveMessage))
        }

        // creating the object of the new employee 
        var newEmployee = new Employee({
            firstName : body.firstName,
            lastName  : body.lastName ? body.lastName :'',
            email     : body.email,
            managerId : body.managerId
        });

        // pushing into database
        Employee.createEmployee(newEmployee, function(err, employeeCreated){
            if(err){
                giveMessage.message = "error while creating the user. Please try again"
        
                return res.end(JSON.stringify(giveMessage))
            }else{
                giveMessage.message  = "Employee created succesfully";
                giveMessage.response = employeeCreated;
                giveMessage.success  = true
        
                return res.end(JSON.stringify(giveMessage))
            }
        })
    })


}


//Get One Employee API
function getOneUser(req, res){
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
    if(!body.employeeId){
        giveMessage.message = 'Missing Field Required'
        return res.end(JSON.stringify(giveMessage))
    };

    Employee.findById(body.employeeId, function(err, employeefind){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
                giveMessage.response = employeefind;
             Manager.findById(employeefind.managerId, function(err, data){
                 if(err){
                    giveMessage.message = "error while fetching the user. Please try again"
                    return res.end(JSON.stringify(giveMessage))
                 }else{
                    giveMessage.Manager = data;
                    giveMessage.message  = "Employee found succesfully";
                    giveMessage.success  = true
            
                    return res.end(JSON.stringify(giveMessage))
                 }
             })   
                
        }
    })
}



/// let find all the users 
function getAllUser(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:''
        
    };

    let body = JSON.parse(req.body);
    console.log(body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    
    Employee.find({}, function(err, employeefind){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
                    giveMessage.response = employeefind;
                    giveMessage.message  = "Employee found succesfully";
                    giveMessage.success  = true
            
                    return res.end(JSON.stringify(giveMessage))       
        }
    })
}





//update the users
function updateUser(req, res){
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
    if(!body.employeeId){
        giveMessage.message = 'Missing Field Required'
        
        return res.end(JSON.stringify(giveMessage))
    }

    //finding the email id does exist or not in database if exist throw required unique mail id 
    Employee.findById(body.employeeId, function(err, employee){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
             return res.end(JSON.stringify(giveMessage))
        }
        else if(!employee){
            giveMessage.message = "Manager not found!"
            return res.end(JSON.stringify(giveMessage))
        }else{
            console.log(body.firstName)
            console.log(body.lastName)
            let updateEmployee = {
                firstName : body.firstName ? body.firstName: manager.firstName,
                lastName : body.lastName ? body.lastName : manager.lastName,
                managerId : body.managerId ? body.managerId : employee.managerId
            }
            

            Employee.findByIdAndUpdate(body.employeeId, updateEmployee,{new:true} ,function(err, updated){
                if(err){
                    giveMessage.message = "error while updating the user. Please try again"
                     return res.end(JSON.stringify(giveMessage))
                }else{
                    console.log('here is one')
                    giveMessage.message  = "employee updated succesfully";
                    giveMessage.response = updated;
                    giveMessage.success  = true
        
                return res.end(JSON.stringify(giveMessage))
                }
            })
        }
        
    })

}


// Removing the user from database

function deleteUser(req, res){
    const giveMessage = {
        success :false,
        response : {},
        message:''
        
    };
    console.log(req.body)
    let body = JSON.parse(req.body);
    console.log(body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    //lets validate the form
    if(!body.employeeId){
        giveMessage.message = 'Missing Field Required'
        return res.end(JSON.stringify(giveMessage))
    };
    // deleting the user
    Employee.findByIdAndRemove(body.employeeId, function(err, removeData){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
                giveMessage.message  = "employee delete succesfully";
                giveMessage.response = removeData;
                giveMessage.success  = true
                return res.end(JSON.stringify(giveMessage))
        }
    })
}



module.exports = {
    createUser,
    getOneUser,
    getAllUser,
    updateUser,
    deleteUser
}
