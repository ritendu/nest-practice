import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type formDocument = HydratedDocument<Form>

interface formData{
    fieldId:string,
    fieldSlug:string,
    fieldType:string,
    placeholder:string,
    options:{
        min: number|null,
          max: number|null,
          start:number|null,
          stop: number|null,
          step: number|null,
          multi: boolean,
          type: string,
          endpoint:string,
          required:boolean
    },
    values:null
}

@Schema({timestamps:true})
export class Form{
@Prop({required:true})
formId:string;
@Prop({required:true})
formName:string;
@Prop({required:true})
data:formData[]
}

export const formSchema = SchemaFactory.createForClass(Form);