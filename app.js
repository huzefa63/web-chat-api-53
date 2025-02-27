const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const io = socketIo(server,{
    cors:{
        origin:'*',
        methods:['GET','POST'],
    }
});

app.use('/api/chat',(req,res)=>{
    if(!req.body.message) res.status(400).json({message:'bad'});
    io.emit('message',{
        name:req.body.name,
        image:req.body.image,
        message:req.body.message,
    })
})

io.on('connection',(socket)=>{
    console.log('connected');
})

server.listen(4000,()=>{
    console.log('listening');
})

