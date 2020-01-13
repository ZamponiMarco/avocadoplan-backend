import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansModule } from './modules/plans/plans.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: "sas",
    }),
    MongooseModule.forRoot('mongodb://localhost/avocadoplan', { useNewUrlParser: true, useUnifiedTopology: true }), 
    PlansModule, 
    UsersModule, 
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
