import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { formSchema } from 'src/schemas/form.schema';
import { UserController } from 'src/users/user.controller';
import { UserFormService } from './user.form.service';
import { UserFormController } from './user.form.controller';
import { JwtService } from '@nestjs/jwt';
import { userSchema } from 'src/schemas/user.schema';
import { formSubmissionsSchema } from 'src/schemas/form.submissions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Form', schema: formSchema },
      { name: 'User', schema: userSchema },
      {name:'FormSubmissions',schema:formSubmissionsSchema}
    ]),
  ],
  controllers: [UserFormController],
  providers: [UserFormService, JwtService],
})
export class UserFormModule {}
