import * as mongoose from 'mongoose';


export const userScheama = new mongoose.Schema({
    name: String,
    email:String,
  });