import mongoose from "mongoose";

const userSchema:mongoose.Schema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name field is required"],
        min: 6,
        max:225
    },
    email:{
        type: String,
        required: [true, "email  is required"],
        min: 5,
        max: 225
    },
    password:{
        type: String,
        required: [true, "password is required"],
        min: 1024,
        max: 6
    }
},
{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export = mongoose.model('User', userSchema);