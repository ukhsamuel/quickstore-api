import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { RatingController } from './rating/rating.controller';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ProductModule, 
    DatabaseModule,
    BrandModule,
    CategoryModule,
    RatingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
