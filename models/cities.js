var mongoose = require('mongoose');


   var weatherSchema = mongoose.Schema({
    name: String,
    url: String,
    descriptif: String,
    maxTemp: Number,
    minTemp: Number,
    lon: Number,
    lat: Number

 });
 
 var weatherModel = mongoose.model('weather', weatherSchema);

 module.exports = weatherModel;