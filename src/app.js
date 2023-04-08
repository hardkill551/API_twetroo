import express from "express"
import cors from 'cors';
const app = express()
app.use(cors())
app.use(express.json())
const users = []
const tweets = []
let informations = []

app.post("/sign-up", (req, res)=>{
const {username, avatar} =  req.body
if(username===undefined||avatar===undefined||username.length===0||avatar.length===0||typeof username!=="string"||typeof avatar!=="string"){
    res.status(400).send("Todos os campos são obrigatórios!")
}
users.push({username, avatar})
res.status(201).send("OK")
})

app.post("/tweets", (req,res)=>{
    const {username, tweet}=req.body
    if(username===undefined||tweet===undefined||username.length===0||tweet.length===0||typeof username!=="string"||typeof tweet!=="string"){
        res.status(400).send("Todos os campos são obrigatórios!")
    }
    if(!users.find(user=>user.username===username)){
        return res.status(401).send("UNAUTHORIZED")
    }
    tweets.push({username, tweet})
    
    res.status(201).send("OK")
})

app.get("/tweets", (req,res)=>{
    while(tweets.length>10){
        tweets.shift()
    }
    informations = []
    tweets.forEach((o, i)=>{

    const avatars = users.find(a=>a.username===o.username)
    informations.push({username:o.username, avatar: avatars.avatar, tweet:o.tweet})

}
)
res.send(informations)
})



app.listen(5000)