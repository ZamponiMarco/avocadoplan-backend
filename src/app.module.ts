import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansModule } from './modules/plans/plans.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({secret: "sas"}),
    MongooseModule.forRoot('mongodb://localhost/avocadoplan', { useNewUrlParser: true, useUnifiedTopology: true }), 
    PlansModule, 
    AuthModule],
})
export class AppModule {}
