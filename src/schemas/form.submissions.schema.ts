import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { v4 as uuidv4 } from 'uuid';
export type formSubmissionsDocument = HydratedDocument<FormSubmissions>;

@Schema({ _id: false })
export class Data {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  healthId: string;

  @Prop({default:[]})
  values: [];
  @Prop({default:0})
  metaDataStatus: number;
}

@Schema({ timestamps: true })
export class FormSubmissions {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({ required: true })
  templateId: string;
  @Prop({ required: true })
  batchId: string;
  @Prop({ default: 0 })
  batchStatus: number;
  @Prop()
  data: Data[];
  @Prop({ default: '' })
  csvLink: string;
}

export const formSubmissionsSchema =
  SchemaFactory.createForClass(FormSubmissions);


 