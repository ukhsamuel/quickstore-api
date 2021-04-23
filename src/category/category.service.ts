import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {CategoryModel} from './entities';

@Injectable()
export class CategoryService {
   
    constructor(
        @InjectModel(CategoryModel) private readonly _categoryModel: typeof CategoryModel,
       ) { }
    

    async create( category:CategoryModel): Promise<CategoryModel>{
        console.log('category',category)
        const saved = await this._categoryModel.create(category);

        return saved;
    }
    
    async findAll(): Promise<CategoryModel[]>{
        return await this._categoryModel.findAll();
    }

    async findOne(id:string): Promise<CategoryModel>{
        return await this._categoryModel.findOne({ where: { id: id } });
    }

    async delete(id:string){
        const softDeleted = await this._categoryModel.destroy({
            where: { id: id },
          });

          return "Category deleted";
    }

    async update(id:string,category:CategoryModel): Promise<CategoryModel>{   
        let updated = await this._categoryModel.update(category, { where: { id } });
        if (updated) {
            let product = await this._categoryModel.findOne({ where: { id } });
            return product;
        }

    }
}
