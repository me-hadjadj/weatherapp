var mongoose = require('mongoose');


var usersSchema = mongoose.Schema({
    username: String,
    mail: String,
    password: String,
    
 });
 
 var usersModel = mongoose.model('users', usersSchema);



module.exports = usersModel;
