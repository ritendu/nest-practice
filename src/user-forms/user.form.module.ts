import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { formSchema } from "src/schemas/form.schema";
import { UserController } from "src/users/user.controller";
import { UserFormService } from "./user.form.service";
import { UserFormController } from "./user.form.controller";



@Module({
imports:[MongooseModule.forFeature([{ name: 'Form', schema: formSchema }])],
controllers:[UserFormController],    
providers:[UserFormService]
})

export class UserFormModule{}