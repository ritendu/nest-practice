import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin-user-controller';
import { AdminService } from './admin-user-service';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { userSchema } from 'src/schemas/user.schema';
import { TokenService } from 'src/utils/token.service';
import { tokenSchema } from 'src/schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'Token', schema: tokenSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtService, TokenService],
})
export class AdminModule {}
