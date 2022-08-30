// require('dotenv').config();

const PORT = process.env.PORT || 3000;
let runningMsg = 'Server is running on '+PORT;

const cors = require("cors");
const express = require("express");
const itemsRouter = require("./route/itemsRoute")


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('frontend'));

app.get("/",(req,res)=>{
   res.sendFile('index.html',{root:'frontend'});
});


app.use(cors({ origin: "*" }));

app.use("/api", itemsRouter);

app.listen(PORT, () => {
  console.log(runningMsg);
});
