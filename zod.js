const zod=require("zod");
const genericbodytypetobereceivedfromuser=zod.object(
        {
            name:zod.string(),
            email:zod.string().email(),
            mcq1:zod.number(),
            mcq2:zod.number(),
            mcq3:zod.number(),
            mcq4:zod.number(),
            mcq5:zod.number(),
            mcq6:zod.number(),
            interestedPeople: zod.array(zod.string()),
            connectedUsers: zod.array(zod.string())
        }
    )

module.exports=
{
    genericbodytypetobereceivedfromuser:genericbodytypetobereceivedfromuser
}