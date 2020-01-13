import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { CredentialsDto } from "src/common/dtos/create-credential.dto";
import { Injectable } from '@nestjs/common';
import { User } from 'src/common/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "sas",
          });
    }
    
    async validate(user: User){
        return {
            id: user._id,
            email: user.email,
        };
    }
}