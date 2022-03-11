const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const portalNew = require('../src/controllers/news.controller.js ');
const portalAdvertising = require('../src/src/controllers/advertisements.controller.js');
const User = require('../src/controllers/users.controller.js ');


const app = express();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/',  (req,res)=>{

    [User, portalNew, portalAdvertising].forEach(element=>{
        element.find({}, (err, data)=>{
            if(err){
                console.log(err);            
            }else{
                res.render('index', {collection:data});   
            } 
        });
    });
});


app.post('/:table/:id',  (req,res)=>{
        const table = req.params.table;
        const collection = "";
        if (table === 'Users'){
            collection = 'Users';
        }else if (table == 'News'){
            collection = 'portalNews';
        }else{
            collection = 'portalAdvertising';
        }
        collection.findByIdAndDelete({_id:req.params.id}, (err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("delete successful");
                collection.find({}, (err, data)=>{
                    if(err){
                        console.log(err);            
                    }else{
                        res.render('index', {collections:data});   
                    } 
                });
            }
        });
})

app.put('/:table/:id', (req,res)=>{
    const table = req.params.table;
    if (table === 'News'){
        res.sendFile(__dirname+'/pages/adminNews.html');
    }else{
        res.sendFile(__dirname+'/pages/adminADs.html');
    }
});


app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});