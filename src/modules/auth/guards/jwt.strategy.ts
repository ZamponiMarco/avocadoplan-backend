import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
              cache: true,
              rateLimit: true,
              jwksRequestsPerMinute: 5,
              jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
            }),
      
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: `http://${process.env.AUTH0_AUDIENCE}`,
            issuer: `https://${process.env.AUTH0_DOMAIN}/`
          });
    }
    
    validate(payload: any, done: VerifiedCallback) {
        if (!payload) {
          done(new UnauthorizedException(), false);
        }
  
        return done(null, payload);
      }
}