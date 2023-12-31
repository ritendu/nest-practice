import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserFormService } from './user.form.service';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { FormSubmitDto } from './dtos/forms.dto';
@Roles(Role.User)
@UseGuards(AuthGuard, RolesGuard)
@Controller('/users')
export class UserFormController {
  constructor(private userFormService: UserFormService) {}

  @Get('/get-forms')
  async getForms(@Res() res) {
    const data = await this.userFormService.geForms();
    return res.status(HttpStatus.OK).send({
      serverResponse: {
        message: 'Success',
      },
      result: {
        data: data,
      },
    });
  }

  @Get('/get/:formId')
  async getForm(@Param('formId') formId, @Res() res){
    const getForm = await this.userFormService.getForm(formId)
    return res.status(HttpStatus.OK).send({
      serverResponse: {
        message: 'Success',
      },
      result: {
        data: getForm,
      },
    });
  }

  @Post('/form/submit')
  async formSubmit(@Body() body:FormSubmitDto, @Req() req){
   const formSubmit = await this.userFormService.formSubmit(body,req.user)
  }

}
