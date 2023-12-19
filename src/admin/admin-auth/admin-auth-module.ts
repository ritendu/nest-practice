import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { tokenSchema } from "src/schemas/token.schema";
import { userSchema } from "src/schemas/user.schema";
import { AdminAuthController } from "./admin-auth-controller";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "src/utils/token.service";
import { AdminAuthService } from "./admin-auth-service";
import { EmailService } from "src/utils/email.service";

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'User', schema: userSchema },
        { name: 'Token', schema: tokenSchema },
      ]),
    ],
    controllers: [AdminAuthController],
    providers: [AdminAuthService, JwtService, TokenService,EmailService]
  })

  export class AdminAuthModule {}