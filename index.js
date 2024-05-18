// creating an server by using in the middle ware in express js

const express = require("express");
const fs = require('node:fs')
const app = express();
const storeData = [];
// using middleware in built function in express to convert the data into json

app.use(express.json());

const logger = (req,res)=>{
    try{
        const date = new Date();
        const methodName = req.method;
        const url = req.url;
        const loggerInfo = {
            title :'log information about user',
           time_stamp :date,
            request_url : url,
            http_method : methodName,
  
        }
        console.log(loggerInfo)
        fs.writeFileSync('logFile.txt',JSON.stringify(loggerInfo));
        console.log("user perform some task and log file is created")

    }catch(err){
        console.log(err)
    }
}





const fetchingData = (req,res,next)=>{
    try{
        console.log("fetching the data by postman")
        const date = new Date();
        const methodName = req.method;
        const url = req.url;
        next();
        res.json({
            status:"success",
            request_url : url,
            http_method : methodName,
            timeStamp : date,
            user_info_array : storeData,
        })
     
    }
    catch(err){
        console.log(err);
    }
    }
    const createData = (req,res,next)=>{
        try{
            console.log("create or insert the data by postman")
        const date = new Date();
        const methodName = req.method;
        const url = req.url;
        const data_body = req.body;
        storeData.push(data_body);
        next();
        res.json({
            status:"data is created succfully",
            request_url : url,
            http_method : methodName,
            timeStamp : date,
             
        })
    }
      catch(err){
              console.log(err);
        }
    }
        
    

app.get('/get-data',fetchingData,logger);

app.post('/post-data',createData,logger);

app.listen(8080,()=>{
  console.log("server is connected");
})