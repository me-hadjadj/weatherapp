var express = require('express');
var router = express.Router();
var request = require('sync-request');
var usersModel = require('../models/users')
require('./bdd');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//route sign-up
router.post('/sign-up', async function(req, res) {
  var newUsers = new usersModel({
    username : req.body.username,
    mail: req.body.mail,
    password: req.body.password, 
  });
  
  var allUsers = await newUsers.save(); // sauvgarder les données dans la bdd dans la variable allUsers
  
  if (allUsers) {
    req.session.user = {
      username: allUsers.username,
      id: allUsers.id
    }
  
  } 
  
    res.redirect('/weather');
    });
  
  //route sign-in avec condition de redirection
  router.post('/sign-in', async function(req, res) {
  
  
  var actualUser= await usersModel.findOne({mail:req.body.email});
  
  if(actualUser == null){
    res.redirect('/')
  } else {
    req.session.mail = req.body.email;
  
    req.session.user = {
      username: actualUser.username,
      id: actualUser.id
    }
    res.redirect('/weather')}
  });

  router.get('/logout', async function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });
  

module.exports = router;
