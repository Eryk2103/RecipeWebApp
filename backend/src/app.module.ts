import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.modul';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RecipesModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
