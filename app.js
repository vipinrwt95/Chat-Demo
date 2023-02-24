const express=require('express');
const bodyParser=require('body-parser');
const fs=require('fs')

const app=express();
app.use(bodyParser.urlencoded({extended:false}))

app.get('/login',(req,res,next)=>{
    
 res.send('<form onSubmit="localStorage.setItem(`username`,document.getElementById(`username`).value)" action="/" method="POST"><input id="username"type="text" name="username" placeholder="username"><button type="submit">Login</button></form>')
})

app.post('/',(req,res,next)=>{
    
    res.send('<form onSubmit="document.getElementById(`username`).value=localStorage.getItem(`username`)" action ="/message" method="POST"><input id="message"type="text" name="message" placeholder="message"><input id="username"type="hidden" name="username"><button type="submit">Send Message</button></form>')
 })  
 app.get('/',(req,res,next)=>{
    
    res.send('<form onSubmit="document.getElementById(`username`).value=localStorage.getItem(`username`)" action ="/message" method="POST"><input id="message"type="text" name="message" placeholder="message"><input id="username"type="hidden" name="username"><button type="submit">Send Message</button></form>')
 }) 
app.post('/message',(req,res,next)=>{
   console.log(req.body)
    fs.appendFile("messages.txt",`  ${req.body.username}:${req.body.message}  `,(err)=>{
        if (err) {
            console.log(err);
          }
         else{
             res.redirect('/')
         } 
    })
    
})


app.listen(3000)