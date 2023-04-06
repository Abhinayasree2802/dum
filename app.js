const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(request,respond){

  respond.sendFile(__dirname + "/index.html");


})


app.post("/", function(request,respond){
  const place = request.body.cityname;
  const apiKey = "13c8c44d96dd3be4e97761b5aab94c5c" ;
  const units = "metric";
  const url= "https://api.openweathermap.org/data/2.5/weather?q=" + place +"&units=" + units + "&appid="+ apiKey ;
  https.get(url,function(respond2){

    respond2.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherCon = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      const iconURL =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png"


      respond.write("<p>the weather in " + place +" is "+ weatherCon +" </p>");
      respond.write("<img src=" + iconURL + ">")
      respond.write("<h1>the temperature in "+ place +" is "+ temp +" degree celsius</h1>");
      respond.send();
    })
  })

})




app.listen(3000, function(){
  console.log("server is runnning on port 3000");
})
