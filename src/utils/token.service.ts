import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenDocument } from 'src/schemas/token.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenTypes } from 'src/enum/token.enum';
import * as moment from 'moment';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<tokenDocument>,
    private jwtService: JwtService,
    private configService:ConfigService
  ) {}

  async generateToken(userId, expires, tokenType: TokenTypes,role, secret = this.configService.get('JWT_SECRET')) {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type: tokenType,
        role:role
    };
    return await this.jwtService.signAsync(payload, { secret });
};

async saveToken(token: string, userId: string, expires: moment.Moment, tokenType: TokenTypes, blacklisted = false) {
    const tokenDoc = await this.tokenModel.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type: tokenType,
        blacklisted,
    });
    return tokenDoc;
};

async verifyToken(token: string, tokenType: TokenTypes) {
    const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT_SECRET') });
    const tokenDoc = await this.tokenModel.findOne({ token, type: tokenType, user: payload.sub, blacklisted: false });
    if (!tokenDoc) {
        throw new NotFoundException('message.tokenNotFound');
    }
    return tokenDoc;
};

async deleteToken(refreshToken) {
    await this.tokenModel.deleteOne({ _id: refreshToken.id });
}

async generateAuthTokens(user) {
    const accessTokenExpires = moment().add(this.configService.get('JWT_ACCESS_EXPIRATION_MINUTES'), 'minutes');
    const accessToken = await this.generateToken(user.id, accessTokenExpires, TokenTypes.ACCESS,user.role);

    const refreshTokenExpires = moment().add(this.configService.get('JWT_REFRESH_EXPIRATION_DAYS'), 'days');
    const refreshToken = await this.generateToken(user.id, refreshTokenExpires, TokenTypes.REFRESH,user.role);
    await this.saveToken(refreshToken, user.id, refreshTokenExpires, TokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};
}
