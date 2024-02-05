const express=require("express");
const app=express();
const {genericbodytypetobereceivedfromuser}=require("./zod");
const {table_entitytoacesssentiredata}=require("./database");
const port=3000;
const cors=require("cors");
app.use(cors());
app.use(express.json());

app.post('/addtitle',async function(req,res,next)
{
    const bodyfromreact=req.body;
    const result=await table_entitytoacesssentiredata.create({
        title:bodyfromreact.title
    })
    if(result)
        res.status(200).json({msg:"Added Title"});
})
app.get('/displaytitle',async function(req,res,next)
{
    const result=await table_entitytoacesssentiredata.find({})
    if(result)
    res.status(200).json({result});
})
app.listen(port)