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
              jwksUri: `https://zamponimarco.eu.auth0.com/.well-known/jwks.json`
            }),
      
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: 'http://localhost:3000',
            issuer: `https://zamponimarco.eu.auth0.com/`
          });
    }
    
    validate(payload: any, done: VerifiedCallback) {
        if (!payload) {
          done(new UnauthorizedException(), false);
        }
  
        return done(null, payload);
      }
}