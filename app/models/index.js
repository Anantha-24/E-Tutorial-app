const dbConfig=require("../config/db.config.js");

const mongoose=require("mongoose");

mongoose.promise=global.promise;
const db= {};
db.mongoose=mongoose;
db.url=dbConfig.url;
db.tutorials =require("./tutorial.model.js")(mongoose);
db.user=require("./user.model.js")(mongoose);
db.role=require("./role.model.js").default;
db.ROLES=["user","admin","moderator"];

module.exports = db;
