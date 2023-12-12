import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/user.schema';
import { tokenSchema } from 'src/schemas/token.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema },
{name:'Token',schema:tokenSchema}
])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
