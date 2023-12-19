import { Body, Controller, Post, Res } from "@nestjs/common";
import { AdminAuthService } from "../admin-auth/admin-auth-service";
import { AdminFormService } from "./admin-form.service";


@Controller('admin')
export class AdminFormController{
    constructor(private adminFormSevice:AdminFormService){}



@Post("/add-form")
async addForm(@Body() body, @Res() res){
const data = await this.adminFormSevice.addForm(body);
}

}