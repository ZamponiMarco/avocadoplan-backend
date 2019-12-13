import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansModule } from './modules/plans/plans.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/avocadoplan', { useNewUrlParser: true, useUnifiedTopology: true }), 
    PlansModule, 
    UsersModule, 
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
