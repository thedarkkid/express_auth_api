import express from "express";
import ApiRoutes from "./routes/api";
import mongoose from "mongoose";
import "dotenv/config";

// connect to db
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
   console.log("connected to db");
});

// instantiate app
const app:express.Application = express();

// route middleware
app.use(express.json());

// register route groups
app.use("/api/v1", ApiRoutes);


// start server
const PORT:number = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(` server up and running on port ${PORT}`);
});