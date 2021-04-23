import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {BrandModel} from './entities';

@Injectable()
export class BrandService {
    
    constructor(
         @InjectModel(BrandModel) private readonly _brandModel: typeof BrandModel,
        ) { }

    async create(photo, brand:BrandModel): Promise<BrandModel>{
        brand.photo = photo.Location;
        console.log('brand',brand)
        const saved = await this._brandModel.create(brand);

        return saved;
    }
    
    async findAll(): Promise<BrandModel[]>{
        return await this._brandModel.findAll();
    }

    async findOne(id:string): Promise<BrandModel>{
        return await this._brandModel.findOne({ where: { id: id } });
    }

    async delete(id:string){
        const softDeleted = await this._brandModel.destroy({
            where: { id: id },
          });

          return "Product deleted";
    }


    async update(id:string, photo, brand:BrandModel): Promise<BrandModel>{   
        if(photo){
            brand.photo = photo.Location;  
        }     
        let updated = await this._brandModel.update(brand, { where: { id } });
        if (updated) {
            let product = await this._brandModel.findOne({ where: { id } });
            return product;
        }

    }
}

