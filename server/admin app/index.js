const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');


const app = express();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());


// ####################################################################codigo para cargar datos y testeo

mongoose.connect('mongodb://localhost:27017/PostDB');
const PostSchema = new mongoose.Schema({
    'title': String,
    'date': Date,
    'message': String,
    'components': Array
});

const NewPost = mongoose.model('post', PostSchema);

app.route('/admin')
.get((req,res)=>{
    res.sendFile(__dirname+'/pages/adminNews.html');
})
.post((req,res)=>{
    const msgContent = req.body.msg;
    const publicityContent = req.body.isPublicity;
    const titleContent = req.body.title;
    const imgContent = req.body.image;
    const videoContent = req.body.video;
    const gifContent = req.body.gif;


    const today = new Date();
    const currentDate = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();

    const arrayContent = [imgContent, videoContent, gifContent];

    const newPost = {
        'title': titleContent,
        'date': currentDate,
        'isPublicity': publicityContent,
        'message': msgContent,
        'components': arrayContent
    }

    NewPost.insertMany([newPost], (err, posts) =>{
        if(err){
            console.log(err);
        }else{
            res.send('Post successfully added!');
        }
    })
})
.delete((req,res) =>{

    const title = req.body.title;
    NewPost.deleteOne({'title': title}, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Deletion successful!');
        }
    });
})
.put((req,res)=>{
    const msgContent = req.body.message;
    const publicityContent = req.body.isPublicity;
    const titleContent = req.body.title;
    const imgContent = req.body.image;
    const videoContent = req.body.video;
    const gifContent = req.body.gif;

    const today = new Date();
    const currentDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    const arrayContent = [imgContent, videoContent, gifContent];

    const newPost = {
        'title': titleContent,
        'date': currentDate,
        'isPublicity': publicityContent,
        'message': msgContent,
        'components': arrayContent
    }

    NewPost.updateOne({'title': titleContent}, {newPost}, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Update successful!');
        }
    });
});
// ####################################################################codigo para cargar datos y testeo


app.get('/',  (req,res)=>{
    NewPost.find({}, (err, posts)=>{
        if(err){
            console.log(err);            
        }else{
            res.render('index', {collections:posts});   
        } 
    });
});


app.delete('/:id/',  (req,res)=>{
    console.log(req.params.id)
        // await PortalNew.findByIdAndDelete(req.params.id);
        // res.json({ message: ["New Deleted. Id: " + req.params.id] });

})


app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});