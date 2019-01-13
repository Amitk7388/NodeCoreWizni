const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

/**
 * Manager Schema
 */
const ManagerSchema = mongoose.Schema({
  firstName: { 
    type: String, 
    default: null
  },
  lastName: { 
    type: String, 
    default: null 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true }
});

var Manager = module.exports  = mongoose.model('Manager', ManagerSchema);

module.exports.createEmployee = function(newManager, cb){
                    newManager.save(cb)
}