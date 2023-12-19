import { Module } from "@nestjs/common";
import { AdminFormController } from "./admin-form.controller";
import { AdminFormService } from "./admin-form.service";
import { MongooseModule } from "@nestjs/mongoose";
import { formSchema } from "src/schemas/form.schema";

@Module({
    imports:[ MongooseModule.forFeature([
       {name:'Form',schema:formSchema}
      ]),],
    controllers:[AdminFormController],
    providers:[AdminFormService]
})

export class AdminFormModule{}