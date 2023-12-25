import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { formDocument } from "src/schemas/form.schema";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdminFormService{
constructor(@InjectModel('Form')private readonly formModel:Model<formDocument>){}

async addForm(data){
const arr = [];
const newArr = data.formFields.map((item)=>{
    item.fieldId = uuidv4()
    return item
})

const newForm = await this.formModel.create({
    formName:data.formName,
    formId:uuidv4(),
    data:newArr
})
return newForm
}

}