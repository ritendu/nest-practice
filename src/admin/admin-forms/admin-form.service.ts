import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { formDocument } from "src/schemas/form.schema";

@Injectable()
export class AdminFormService{
constructor(@InjectModel('Form')private readonly formSchema:Model<formDocument>){}

async addForm(data){
console.log(JSON.stringify(data),"data")
}

}