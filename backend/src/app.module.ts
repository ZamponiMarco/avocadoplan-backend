import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansModule } from './modules/plans/plans.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/avocadoplan', { useNewUrlParser: true, useUnifiedTopology: true }), PlansModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
