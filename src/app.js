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
if(username===undefined||avatar===undefined){
    res.sendStatus(404)
}
users.push({username, avatar})
res.send("OK")
})

app.post("/tweets", (req,res)=>{
    const {username, tweet}=req.body
  
    if(!users.find(user=>user.username===username)){
        return res.status(401).send("UNAUTHORIZED")
    }
    tweets.push({username, tweet})
    res.send("OK")
})

app.get("/tweets", (req,res)=>{
    informations = []
    tweets.forEach((o, i)=>{

    const avatars = users.find(a=>a.username===o.username)
    informations.push({username:o.username, avatar: avatars.avatar, tweet:o.tweet})

}
)
res.send(informations)
})



app.listen(5000)