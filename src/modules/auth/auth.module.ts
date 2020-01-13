import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { OwnerGuard } from './owner.guard';
import { PlansModule } from '../plans/plans.module';

@Module({
  imports: [
    UsersModule,
    PlansModule,
    JwtModule.register({
      secret: "sas",
      signOptions: {
      }
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    OwnerGuard
  ]
})
export class AuthModule {}
