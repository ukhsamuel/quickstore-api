import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductService } from './product.service';
import { 
  ProductModel,
  ProductPhotoModel
} from './entities';
import { ImageUploadService } from '../utils/uploads';

@Module({
  imports: [SequelizeModule.forFeature([
    ProductModel,
    ProductPhotoModel
  ])],
  controllers: [ProductController],
  providers: [
    ProductService,
    ImageUploadService
  ]
})
export class ProductModule {}
