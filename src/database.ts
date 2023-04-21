import mongoose, { connection } from "mongoose";
import dbConfig from "./config/db-config";

mongoose.connect(`mongodb+srv://alebecerrac96:iEKCMC8mxRt7sslI@cluster0.ltq44gk.mongodb.net/comprasapp?`)
.then(res=>{console.log("*************Conected to the database*************")})
.catch(error => {console.log(error)})

