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
    let {page} = req.query
    if(page!==undefined&&!(page>=1)){
        return res.status(400).send("Informe uma página válida!")
    }
    if(page===undefined){
        page = 1 
    }

    informations = []
    const reverseTweets = tweets.reverse()
    for(let i = page*10-10; i<page*10;i++){
    if(reverseTweets[i]!==undefined){
    const avatars = users.find(a=>a.username===reverseTweets[i].username)
    informations.push({username:reverseTweets[i].username, avatar: avatars.avatar, tweet:reverseTweets[i].tweet})
}

}

res.send(informations)
})

app.post("/tweets", (req,res)=>{
    const {user} = req.headers
    const {tweet}=req.body
    if(user===undefined||tweet===undefined||user.length===0||tweet.length===0||typeof user!=="string"||typeof tweet!=="string"){
        res.status(400).send("Todos os campos são obrigatórios!")
    }
    if(!users.find(u=>u.username===user)){
        return res.status(401).send("UNAUTHORIZED")
    }
    tweets.push({username:user, tweet})
    
    res.status(201).send("OK")
})


app.get("/tweets/:username", (req,res)=>{
    const {username} = req.params
    const userTweets = tweets.filter((tweet)=> tweet.username===username)
    res.status(200).send(userTweets)
})




app.listen(5000)