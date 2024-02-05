const zod=require("zod");
const genericbodytypetobereceivedfromuser=zod.object(
        {
            title:zod.string()
        }
    )

module.exports=
{
    genericbodytypetobereceivedfromuser:genericbodytypetobereceivedfromuser
}