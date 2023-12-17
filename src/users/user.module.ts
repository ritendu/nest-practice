import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/user.schema';
import { tokenSchema } from 'src/schemas/token.schema';
import { TokenService } from 'src/utils/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema },
{name:'Token',schema:tokenSchema}
])],
  controllers: [UserController],
  providers: [UserService,TokenService,JwtService],
})
export class UserModule {}
