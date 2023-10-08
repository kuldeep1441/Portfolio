require("dotenv").config();
const express=require('express');
const app=express();
const path =require('path');
const hbs=require('hbs')
const port=process.env.PORT || 3000;
const static_path=path.join(__dirname,'../views');
const partials_path=path.join(__dirname,'../views/partials');
const model=require('./model/model');
const collection1=model.collection1;
const collection2=model.collection2;
require('./database/config');
app.set('view engine','hbs');
app.set('views',static_path);
app.use('/public',express.static(path.join(__dirname,'../public')));
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')));
hbs.registerPartials(partials_path);
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.render('home');

})
app.post('/contactdata',async(req,res)=>{
    try {
    const username=req.body.user;
    const email=req.body.email;
    const msg=req.body.msg;
         const contactSave=new collection1({
            name:username,
            email:email,
            message:msg
         });
         const saveData=await contactSave.save();
         if(saveData){
            res.render('home');
         }
    } catch (error) {
        res.status(401).send(error);
    }
})
app.listen(port,()=>{
    console.log(`you are on port ${port}`);
})