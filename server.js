const express = require('express')
const static = require('express-static')
const mockData = require('./data.json')
let server = express()
server.listen(9000)

server.get("/api/seller",(req,res)=>{
    res.json({
        errno:0,
        data:mockData.seller
    })
})
server.get("/api/goods", (req,res)=>{
    res.json({
        errno:0,
        data:mockData.goods
    })
})
server.get("/api/ratings",(req,res)=>{
    res.json({
        errno:0,
        data:mockData.ratings
    })
})

server.use(static('./dist/'))