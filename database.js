const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://ankith1703:8IKldrs7uxnFQhHK@cluster0.5ukccla.mongodb.net/")
const schemaofentryindatabase=mongoose.Schema({
    title:String
});
const table_entitytoacesssentiredata=mongoose.model('entry',schemaofentryindatabase)

module.exports=
{
    table_entitytoacesssentiredata:table_entitytoacesssentiredata
}