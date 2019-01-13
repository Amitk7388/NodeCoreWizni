const Project = require('../models/project');
const Employee = require('../models/employee');
const Manager = require('../models/manager')
let mongoose = require('mongoose');
let Schema = mongoose.Schema

function createProject (req, res){
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
    if(!body.projectName || !body.managerId || !body.employeeIds ){
        giveMessage.message = 'Missing Field Required'
        
        return res.end(JSON.stringify(giveMessage))
    }
    
        // creating the object of the new project 
        var newProject = new Project({
            projectName : body.projectName,
            managerId  :   body.managerId,
            employeeIds     : body.employeeIds
        });

        // pushing into database
        Project.createProject(newProject, function(err, projectCreated){
            if(err){
                giveMessage.message = "error while creating the user. Please try again"
        
                return res.end(JSON.stringify(giveMessage))
            }else{
                giveMessage.message  = "Manager created succesfully";
                giveMessage.response = projectCreated;
                giveMessage.success  = true
        
                return res.end(JSON.stringify(giveMessage))
            }
        })
    
}



// get one projects
function getOneProject(req, res){
    const giveMessage = {
        success :false,
        response : {
            Project:{},
            Manager:{},
            Employee:[]
        },
        message:''
        
    };

    let body = JSON.parse(req.body);
    console.log(body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    //lets validate the form
    if(!body.projectId){
        giveMessage.message = 'Missing Field Required'
        return res.end(JSON.stringify(giveMessage))
    };

    Project.findById(body.projectId, function(err, heyData){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again1"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
            console.log(heyData)
                giveMessage.response.Project = heyData;

                

      let newData = heyData.managerId 
      console.log(newData)
      Manager.findById(newData, function(err, data){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again2"
            return res.end(JSON.stringify(giveMessage))
        }
         else{
             console.log(data)
             giveMessage.response.Manager = data
             let finalData = heyData.employeeIds[0]
        finalData = finalData.split(',') //taking the value in array and spliting by (',')
        
        Employee.find({ "_id": { "$in": finalData } }, function(err,docs) {
            if(err){
                giveMessage.message = "error while fetching the user. Please try again3"
                return res.end(JSON.stringify(giveMessage))
            }else{
                console.log(docs)
               docs.forEach(element => {
                giveMessage.response.Employee.push(element)
                });
             
                giveMessage.message  = "projects found succesfully2";
                giveMessage.success  = true

                return res.end(JSON.stringify(giveMessage))
            }
        });
        }
      })        
        }
    })
}


function getAllProject(req,res){
    
        const giveMessage = {
            success :false,
            response : {},
            message:''  
        };
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
    
        //lets find the details
        Project.find({}, function(err, data){
            if(err){
                giveMessage.message = "error while fetching the user. Please try again"
                return res.end(JSON.stringify(giveMessage))
            }
            else{
                    giveMessage.message  = "projects found succesfully";
                    giveMessage.response = data;
                    giveMessage.success  = true
            
                    return res.end(JSON.stringify(giveMessage))
            }
        })
}



// update all the projects
function updateProject(req, res){
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
    if(!body.projectId){
        giveMessage.message = 'Missing Field Required'
        
        return res.end(JSON.stringify(giveMessage))
    }

    //finding the email id does exist or not in database if exist throw required unique mail id 
    Project.findById(body.projectId, function(err, project){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
             return res.end(JSON.stringify(giveMessage))
        }
        else if(!project){
            giveMessage.message = "Manager not found!"
            return res.end(JSON.stringify(giveMessage))
        }else{
            let updateProject = {
                projectName : body.projectName ? body.projectName : project.projectName,
                managerId : body.managerId ? body.managerId: project.managerId,
                employeeIds : body.employeeIds ? body.employeeIds : project.employeeIds
            }
            

            Project.findByIdAndUpdate(body.projectId, updateProject,{new:true} ,function(err, updated){
                if(err){
                    giveMessage.message = "error while updating the user. Please try again"
                     return res.end(JSON.stringify(giveMessage))
                }else{
                    console.log('here is one')
                    giveMessage.message  = "project updated succesfully";
                    giveMessage.response = updated;
                    giveMessage.success  = true
        
                return res.end(JSON.stringify(giveMessage))
                }
            })
        }
        
    })
}


// deleting the Project Api
function deleteProject(req, res){
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
    if(!body.projectId){
        giveMessage.message = 'Missing Field Required'
        return res.end(JSON.stringify(giveMessage))
    };
    // deleting the user
    Project.findByIdAndRemove(body.projectId, function(err, projectfind){
        if(err){
            giveMessage.message = "error while fetching the user. Please try again"
            return res.end(JSON.stringify(giveMessage))
        }
        else{
            giveMessage.message  = "project delete succesfully";
                giveMessage.response = projectfind;
                giveMessage.success  = true
                return res.end(JSON.stringify(giveMessage))
        }
    })
}






module.exports = {
    createProject,
    getOneProject,
    getAllProject,
    updateProject,
    deleteProject
}
