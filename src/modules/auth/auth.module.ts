import { Module } from '@nestjs/common';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PlansModule } from '../plans/plans.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PlansModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule {}
