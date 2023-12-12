import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TokenTypes } from 'src/enum/token.enum';
export type tokenDocument = mongoose.HydratedDocument<Token>

@Schema({timestamps:true})
export class Token {
    @Prop({ required: true })
    token: string;

    @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true })
    user: any;

    @Prop({ enum: Object.values(TokenTypes), required: true })
    type: string;

    @Prop({ required: true })
    expires: Date;

    @Prop({ default: false })
    blacklisted: boolean;

}


export const tokenSchema = SchemaFactory.createForClass(Token)