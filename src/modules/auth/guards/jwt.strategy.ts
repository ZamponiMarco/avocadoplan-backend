import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: `http://${process.env.AUTH0_AUDIENCE}`,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    if (!payload) {
      done(new UnauthorizedException(), false);
    }

    let containsUser = await this.usersService.containsUserById(payload['sub']);

    if (!containsUser) {
      await this.usersService.createUser({
        _id: payload['sub'],
        upvotes: [],
        downvotes: [],
      });
    }

    return done(null, payload);
  }
}
