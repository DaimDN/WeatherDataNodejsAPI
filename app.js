const express = require('express');
const app = express();
const port = 3000;
var parser = require('body-parser');
const https = require("https");



app.use(parser.urlencoded({extended:true}));


app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){

const location = req.body.cityName;
const country = req.body.countryname;
const apiKey = "8b656d1dbc6b12d0c93aa620c48eb1c3";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+","+country + "&appid="+apiKey + "&units="+unit;

https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
    var weatherData = JSON.parse(data);

    res.write("<h1>" + weatherData.name);
    res.write("<h1> The temperature of "+ location + " is : " + weatherData.main.temp);
      res.write("<h1> The Humidity of "+ location + " is : " + weatherData.main.humidity);

    res.send();


  });

});

});




app.listen(port, function(req, res){
  console.log("Server is up and running on port no " + port);
});
