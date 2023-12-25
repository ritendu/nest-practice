import { Controller } from "@nestjs/common";
import { UserFormService } from "./user.form.service";

@Controller()
export class UserFormController{
    constructor(private userFormService:UserFormService){}



}