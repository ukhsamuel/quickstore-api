import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { 
  BrandModel,
} from './entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageUploadService } from '../utils/uploads';

@Module({
  imports: [SequelizeModule.forFeature([
    BrandModel
  ])],
  providers: [
    BrandService,
    ImageUploadService
  ],
  controllers: [BrandController]
})
export class BrandModule {}
