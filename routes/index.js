const { log } = require('debug/src/browser');
var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
// var session = require('express-session');


var request = require('sync-request');
var weatherModel = require('../models/cities');
var usersModel = require('../models/users')
require('./bdd');


/* GET home page. */
router.get('/', function(req, res, next) {


res.render('login', { title: 'Express' });
});




router.get('/weather', async function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  }
  cityList = await weatherModel.find();
  res.render('weather', {cityList, weatherModel});
});



router.post('/add-city', async function(req, res) {

  var requete = request("GET",`https://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&lang=fr&appid=dbe7f9d1b4701b8cbe4ef2e386821dc1&units=metric`);
  var dataAPI = JSON.parse(requete.body);
  cityList = await weatherModel.find();

  let isExist = false;

  for (var i = 0; i < cityList.length; i++){
    if (cityList[i].name.toLowerCase() === req.body.name.toLowerCase()){
            isExist = true;
            console.log('isExiste');
    }
  }

  if (!isExist){
    if (dataAPI.name !== undefined){
      var cityModel = new weatherModel({
        name: req.body.name,
        url: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
        descriptif: dataAPI.weather[0].description,
        maxTemp: dataAPI.main.temp_max,
        minTemp: dataAPI.main.temp_min,
        lon: dataAPI.coord.lon,
        lat: dataAPI.coord.lat
    
     });
     console.log(cityModel.lat)
     await cityModel.save();
     cityList = await weatherModel.find();
    
  } 
  }

  res.render('weather', {cityList:cityList});
});

router.get('/delete-city', async function(req, res, next) {

await weatherModel.deleteOne({_id: req.query.id});
cityList = await weatherModel.find()

//cityList.splice(req.query.id,1);
res.render('weather', {cityList:cityList});

});
router.get('/update-city', async function(req, res, next) {
  var cityList = await weatherModel.find();
  for(var i=0;i<cityList.length;i++){
    var data = await request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&lang=fr&units=metric&appid=dbe7f9d1b4701b8cbe4ef2e386821dc1`);
    var dataAPI = JSON.parse(data.body);
 
     await weatherModel.updateOne(
      { _id: cityList[i].id},
      {
        name: cityList[i].name,
        url: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
        descriptif: dataAPI.weather[0].description,
        maxTemp: dataAPI.main.temp_max,
        minTemp: dataAPI.main.temp_min,
        lon: dataAPI.coord.lon,
        lat: dataAPI.coord.lat
      }
     );
     //console.log(cityList[i].name);
   }
 
   cityList = await weatherModel.find();
   //console.log(dataAPI);
  res.render('weather',{cityList});
 
 });
 
  

module.exports = router;
