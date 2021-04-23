import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { 
  RatingModel,
} from './entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingController } from './rating.controller';

@Module({
  imports: [SequelizeModule.forFeature([
    RatingModel
  ])],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
