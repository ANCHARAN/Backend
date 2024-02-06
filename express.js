const express=require("express");
const app=express();
const {genericbodytypetobereceivedfromuser}=require("./zod");
const {table_entitytoacesssentiredata,MatchResult,MutualFriends}=require("./database");
const port=3000;
const cors=require("cors");
app.use(cors());
app.use(express.json());

function middleware_validator(req,res,next)
{
    const inputfromuser=req.body
    const result=genericbodytypetobereceivedfromuser.safeParse(inputfromuser);
    if(!result.success)
        res.status(411).json({msg:"Input Validation Error"});
    else
        next();
}

app.post('/addentry',middleware_validator,async function(req,res,next)
{
    const bodyfromreact=req.body;
    const result=await table_entitytoacesssentiredata.create({
        name:bodyfromreact.name,
        email:bodyfromreact.email,
        mcq1:bodyfromreact.mcq1,
        mcq2:bodyfromreact.mcq2,
        mcq3:bodyfromreact.mcq3,
        mcq4:bodyfromreact.mcq4,
        mcq5:bodyfromreact.mcq5,
        mcq6:bodyfromreact.mcq6,
        interestedPeople:bodyfromreact.interestedPeople || []   
    })
           
    if(!result)
        res.status(400).json({msg:"Incorrect request"})    
    else
        res.status(200).json({msg:"Added Entry"});
})

// app.get('/displayentry',async function(req,res,next)
// {
//     const result=await table_entitytoacesssentiredata.find({})
//     if(result)
//     res.status(200).json({result});
// })

app.post('/mutual', async (req, res) => {
    const currentUser = req.body;
    const interestedUsers = await table_entitytoacesssentiredata.find({
      name: { $in: currentUser.interestedPeople },
    });
  
    const mutualFriends = interestedUsers.filter(user => user.interestedPeople.includes(currentUser.name));
  
    // Update connectedUsers field for each user
    const promises = mutualFriends.map(async (friend) => {
      await table_entitytoacesssentiredata.updateOne(
        { name: currentUser.name },
        { $addToSet: { connectedUsers: friend.name } }
      );
      await table_entitytoacesssentiredata.updateOne(
        { name: friend.name },
        { $addToSet: { connectedUsers: currentUser.name } }
      );

      await MutualFriends.create({
        user1: {
          userId: currentUser._id,
          userName: currentUser.name,
        },
        user2: {
          userId: friend._id,
          userName: friend.name,
        },
      });
    });
  
    await Promise.all(promises);
  
    res.json({ msg:"Mutual Preferences Updated" });  
});

app.post('/matchPreferences', async (req, res) => {
const currentUser = req.body;  
const matchingEntries = await table_entitytoacesssentiredata.find({
      _id: { $ne: currentUser._id },
      mcq1: { $gte: currentUser.mcq1 - 10, $lte: currentUser.mcq1 + 10 },
      mcq2: { $gte: currentUser.mcq2 - 10, $lte: currentUser.mcq2 + 10 },
      mcq3: { $gte: currentUser.mcq3 - 10, $lte: currentUser.mcq3 + 10 },
      mcq4: { $gte: currentUser.mcq4 - 10, $lte: currentUser.mcq4 + 10 },
      mcq5: { $gte: currentUser.mcq5 - 10, $lte: currentUser.mcq5 + 10 },
      mcq6: { $gte: currentUser.mcq6 - 10, $lte: currentUser.mcq6 + 10 },
    });
 
    const filteredEntries = matchingEntries.filter(entry => (
        entry.name !== currentUser.name && entry._id !== currentUser._id
      ));

    const matchedResults = filteredEntries
      .map(entry => ({
        userName: currentUser.name,
        matchedUserName: entry.name,
        matchPercentage: calculateMatchPercentage(currentUser, entry),
      }))
      .filter(match => match.matchPercentage > 70);
  
    // Insert matched results into MatchResult collection
    await MatchResult.insertMany(matchedResults);
  
    res.json({msg:"Matched Preferences Updated"});
  });
  
  function calculateMatchPercentage(user1, user2) {
    const totalPreferences = Object.keys(user1).length - 1; // Subtracting 1 for _id
    let matchingPreferences = 0;
  
    for (const preference in user1) {
      if (preference !== '_id' && user1[preference] === user2[preference]) {
        matchingPreferences++;
      }
    }
  
    return (matchingPreferences / totalPreferences) * 100;
  }


















  
app.listen(port)
