const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * Project Schema
 */
const ProjectSchema = new mongoose.Schema({
  projectName: { 
    type: String, 
    default: null 
  },
  managerId : {
    type: Schema.Types.ObjectId, 
  },
  employeeIds :[
    {
       type:String
    }
  ],
});

var Project =module.exports = mongoose.model('Project', ProjectSchema);


module.exports.createProject = function(newProject, cb){
                  newProject.save(cb)
}