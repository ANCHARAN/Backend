const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://ankith1703:8IKldrs7uxnFQhHK@cluster0.5ukccla.mongodb.net/")

const schemaofentryindatabase=mongoose.Schema({
    name:String,
    email:String,
    mcq1:Number,
    mcq2:Number,
    mcq3:Number,
    mcq4:Number,
    mcq5:Number,
    mcq6:Number,
    interestedPeople: [{ type: String, ref: 'entry' }], // Assuming username of other entries
    connectedUsers: [{ type: String, ref: 'entry' }],
    // interestedPeople: [{ type: String }],
    // connectedUsers: [{ type: String }]
});


const matchResultSchema = new mongoose.Schema({
    userName: String,
    matchedUserName: String,
    matchPercentage: Number,
  });
  
  const mutualFriendsSchema = new mongoose.Schema({
    user1: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'entry' },
        userName: String,
      },
      user2: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'entry' },
        userName: String,
      }
  });
  
  
const table_entitytoacesssentiredata=mongoose.model('entry',schemaofentryindatabase);

const MatchResult = mongoose.model('matchResult', matchResultSchema);

const MutualFriends = mongoose.model('MutualFriends', mutualFriendsSchema);

module.exports=
{
    table_entitytoacesssentiredata:table_entitytoacesssentiredata,
    MatchResult:MatchResult,
    MutualFriends:MutualFriends
}



