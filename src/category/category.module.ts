import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { 
  CategoryModel,
} from './entities';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([
    CategoryModel
  ])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
