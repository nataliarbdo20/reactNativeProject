import mongoose from "mongoose";    

const bookSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true,
      },
     } 
      }, { timestamps: true });