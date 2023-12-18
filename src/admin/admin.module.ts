import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AuthGuard } from "src/guard/auth.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [MongooseModule.forFeature([])],
    controllers: [AdminController],
    providers: [AdminService,JwtService],
  })
  export class AdminModule {}