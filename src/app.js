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

app.get("/tweets", (req,res)=>{
    const {page} = req.query
    if(!page>0||!undefined){
        res.status(400).send("Informe uma página válida!")
    }

    informations = []
    for(let i = tweets.length-1; i>tweets.length-11;i++){

    const avatars = users.find(a=>a.username===tweets[i].username)
    informations.push({username:tweets[i].username, avatar: avatars.avatar, tweet:tweets[i].tweet})
}
res.send(informations)
}
)


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


app.get("/tweets/:username", (req,res)=>{
    const {username} = req.params
    const userTweets = tweets.filter((tweet)=> tweet.username===username)
    res.status(200).send(userTweets)
})




app.listen(5000)