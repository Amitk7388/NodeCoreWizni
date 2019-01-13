const mongoose = require('mongoose');
const Schema = mongoose.Schema

/*
 * Employee Schema
 */
const EmployeeSchema = mongoose.Schema({
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
      unique: true },
  managerId : {
      type: Schema.Types.ObjectId, 
      ref: 'managers'}
});

var Employee = module.exports = mongoose.model('Employee', EmployeeSchema);

module.exports.createEmployee = function(newEmployee, cb){
                newEmployee.save(cb)
}