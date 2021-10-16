const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app= express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
  // res.send("Server is up and running");
});
app.post("/",function(req,res){
  //console.log(req.body.cityName);
  console.log("Post Request recived!!");
  const query = req.body.cityName;
  const apiKey = "b4725c6895224e54729c68dff8e033c0";
  const unit= "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+apiKey +"&units=" + unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data);
    //  console.log(weatherData);
    const temp=weatherData.main.temp;
    console.log(temp);
    const weatherDescp=weatherData.weather[0].description;
    console.log(weatherDescp);
    const icon=weatherData.weather[0].icon;
    const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<p> The Weather is currently "+weatherDescp + "</p>");
    res.write("<h1>The Temperature in " +query +" is "+temp+" degrees Celcius.</h1>");
    //Adding image URL
    res.write("<img src="+imageURL+">");
    res.send();
    })
  })

})



app.listen(3000,function(){
  console.log("Server is running in port 3000");
});
