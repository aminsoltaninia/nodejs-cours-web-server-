const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
//<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico"></link>
var app = express();// bainkar ye app ro creat mikone ba expree


// Request haye http 
// Get Post Patch Delete----> http req
//vaghti bad az URL string ersal konim yani darim get mikonim
//yani be in addres mirim : localhost:3000


// static page 
// adres midim mahale file static ro
// __dirname mahale jariyo mide 

app.use(express.static(__dirname+'/public'))
// bad aznasbe hbs baraye dynamic 
app.set('view engine','hbs')
// har tedad midleware bashe ghabl az baghiye ejra mishe 
// midleware ye dariche hast ye police ke hameye rout ha az inja bayad rad beshe
// midleware baraye ineke login chek beshe 
// ehraz hoviyat ro chek konim va ...
app.use(function(req,res,next){
   //baraye ejra shodane code ha bayad az next estefade eshe
   var now=new Date().toString();
   //ba inkar be ezaye har req ke midim mese refresh miyad yebar consol mikone
   var log=`${now}, method : ${req.method} , url : ${req.url}`;
   console.log(log);
   fs.writeFileSync('server.log',log+'\n');
   next();
    
})

// sakhtane midle ware baraye tamire site
app.use(function(req,res,next){
    res.render('offline.hbs');
})


// partial baes mishe ghesmathaii az proghe ke tekrari hast ro chanbar nanvisim mese footer
// baraye inkar aval masire partial ro be system moarefi mikonim

hbs.registerPartials(__dirname+'/views/partials');

//ezafe kardane ye seri tavabe  
hbs.registerHelper('getcurrentYear',function(){
    return new Date().getFullYear();
})

hbs.registerHelper('upercaseFilter',function(text){
    return text.toUpperCase();
})


app.get('/',function(req,res){
    //res.send('Hello Express');
    //  res.send({
    //      name:'Roxo',
    //      website:[          // static    
    //          'www.roxo.ir',
    //          'www.roxo.ir/plus'
    //      ]
    //  }) 

    // dynamic
    res.render('home.hbs',{
        titlepage: 'first page',
        // estefade az register helper
        //currentlyYear: new Date().getFullYear(), 
        welcomeMessage:'welcome to my site '
    })
});
// baraye inke toye  mororgar faal konim web server ro 
// va khrojiye expres ro dakhele explorer bebinim bayad az listen estefade kinim 
 app.get('/about',(req,res)=>{

     //res.send('hello about');// static
     res.render('abouts.hbs',{
         titlepage: 'Hi amin'
         // estefade az register helper
         //currentlyYear: new Date().getFullYear() 
     });
 })
 app.listen(3000,()=>{
    console.log('server is run in port 3000'); 
 });






