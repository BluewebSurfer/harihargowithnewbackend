const express = require ("express");
const bodyParser = require ("body-parser");
const ejs=require ("ejs");
const Mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const Mail = require("nodemailer/lib/mailer");


const app =express();
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extented:true}));

url = "mongodb+srv://Rupan:Rupan@01@cluster0.whfx5.mongodb.net/information?retryWrites=true&w=majority"
Mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("oohh yeah database connected"))
.catch((error)=>console.log(error))


const homeschema=Mongoose.Schema({
    fullname:String,
    email:{
        type:String,
        required:true
    },
    message:String
})

const contactschema=Mongoose.Schema({
    fullname:String,
    email:{
        type:String,
        required:true
    },
    phone:String,
    message:String
})
const volschema=Mongoose.Schema({
    fullname:String,
    email:{
        type:String,
        required:true
    },
    num:Number,
    aadhar:Number,
    Pan :String,
    occupation:String
})

const hoemmessage = Mongoose.model("homemessage",homeschema);
const contactmessage = Mongoose.model("contactmessage",contactschema);
const  volmessage = Mongoose.model("volmessage",volschema);








//allthe get methods
app.get("/",function(req,res){
    res.render("home");
});

app.get("/ourteam",function(req,res){
    res.render("ourteam");
});

app.get("/aboutus",function(req,res){
    res.render("aboutus");
});

app.get("/contactus",function(req,res){
    res.render("contactus");
});

app.get("/Donate",function(req,res){
    res.render("Donate");
});

app.get("/organisation",function(req,res){
    res.render("organisation");
});

app.get("/ourwork",function(req,res){
    res.render("ourwork");
});


app.get("/privacy",function(req,res){
    res.render("privacy");
});

app.get("/volenteer",function(req,res){
    res.render("voleenteers");
});


//postmethods

app.post("/",async function(req,res){
    homepost ={
    fullname:req.body.name,
    email:req.body.email,
    message:req.body.message
}
const hpost=new hoemmessage(homepost);
await hpost.save();

mail(hpost.enmail)
res.redirect("/");
});


app.post("/contactus",async function(req,res){
    contactpost ={
    fullname:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    message:req.body.message
}
const cpost=new contactmessage(contactpost);
await cpost.save();

mail(contactpost.email)
res.redirect("/");
});


app.post("/volenteer",async function(req,res){
    volpost ={
    fullname:req.body.name,
    email:req.body.email,
    phone:req.body.num,
    aadhar:req.body.aadhar,
    pan:req.body.pan,
    message:req.body.message
}
const vpost=new volmessage(volpost);
await vpost.save();

mail(volpost.email)
res.redirect("/");
});

//sending automatic mail
function mail(adres){
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'rupanbiswas08@gmail.com',
            pass:'Rupan@01'
        }
    });
    
    let mailoptions ={
        from:'rupanbiswas08@gmail.com',
        to:`${adres}`,
        subject:'testing',
        text:'Thank you for contacting. We will get back to you'
    };
    
    transporter.sendMail(mailoptions, function (err, info) {
        if(err){
            console.log(err)
        }else{
            console.log("it worked")
        }
     });
    
    }

let port = process.env.PORT;
    if (port == null || port == "") {
      port = 8000;
    }
    app.listen(port,function(req,res){
        console.log("server started on port 8000");
    });