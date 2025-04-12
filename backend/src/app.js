const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/test", (req, res) => {
  res.json({message:"test page"});
})

app.use("/home", (req, res) => {
  res.json({message:"Home page"});
})

app.listen(PORT, ()=>{
  console.log("Server running🏃‍♂️‍➡️on port 3000");
});