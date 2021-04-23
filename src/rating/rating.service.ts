import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {RatingModel} from './entities';

@Injectable()
export class RatingService {
    
    constructor(
         @InjectModel(RatingModel) private readonly _ratingModel: typeof RatingModel,
        ) { }
    

        async create( rating:RatingModel): Promise<RatingModel>{
            const saved = await this._ratingModel.create(rating);
    
            return saved;
        }
    
        async findAll(): Promise<RatingModel[]>{
            return await this._ratingModel.findAll();
        }
    
        async findOne(id:string): Promise<RatingModel>{
            return await this._ratingModel.findOne({ where: { id: id } });
        }
    
        async delete(id:string){
            const softDeleted = await this._ratingModel.destroy({
                where: { id: id },
              });
    
              return "Rating deleted";
        }

        async update(id:string,rating:RatingModel): Promise<RatingModel>{   
            let updated = await this._ratingModel.update(rating, { where: { id } });
            if (updated) {
                let rating = await this._ratingModel.findOne({ where: { id } });
                return rating;
            }
    
        }

}
