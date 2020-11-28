const express=require('express');
const path=require('path');
const port=8000;
 
const dp=require("./config/mongoose");
const contact=require('./model/contact');
const app=express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

var contactList=[
    {
        name :"Subham Yadav",
        phone:"98464651464"
    },
    {
        name:"Sita",
        phone:"65462484346"
    },
    {
        name:"Mita",
        phone:"58648458454"
    }
]


app.get('/', function(req, res){
   
   contact.find({}, function(err, contactDb){

    if(err){
        console.log('ERROR!!!');
        return;
    }

    return res.render('home',{
        title:"My Contact list",

        Contact_List: contactDb
        
    });
   
  });
   
   

});

app.post('/add_contact',function(req,res){

    // contactList.push(req.body);
    // return res.redirect('/');

    contact.create({
        name : req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('ERROR !!');
            return;
        }
        return res.redirect('/');
    });
});

//done
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

app.get('/delete-contact',function(req,res){
   // console.log(req.query);
    //get the query from the url
    let id=req.query.id;
  
    //find the contact and delete it
  contact.findByIdAndDelete(id,function(err){
   
    if(err){
        console.log('ERROR !!');
        return;
    }

    return res.redirect('/');
  });

   

});