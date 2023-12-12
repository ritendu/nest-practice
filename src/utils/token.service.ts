import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenDocument } from 'src/schemas/token.schema';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private readonly tokenSchema: Model<tokenDocument>,
    private jwtService: JwtService,
  ) {}
}
