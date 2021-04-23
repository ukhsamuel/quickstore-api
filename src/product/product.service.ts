import { Injectable } from '@nestjs/common';
import {ProductModel, ProductPhotoModel} from './entities';
import { InjectModel,  } from '@nestjs/sequelize';
import { CategoryModel } from '../category/entities/category.entity';
import { BrandModel } from '../brand/entities/brand.entity';
import Sequelize from 'sequelize';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectModel(ProductModel) private readonly _productModel: typeof ProductModel,
        @InjectModel(ProductPhotoModel) private readonly _productPhotoModel: typeof ProductPhotoModel,
        ) { }

        async create(photo, product:ProductModel): Promise<ProductModel>{
            product.photo = photo.Location;
            console.log('product',product)
            const saved = await this._productModel.create(product);
    
            return saved;
        }
    
        async addProductPhoto(photo, id): Promise<ProductPhotoModel>{
            let data = {url:photo.Location,product_id:id};

            console.log(data)
            const saved = await this._productPhotoModel.create(data);
    
            return saved;
        }
    
        async findAll(orderBy=""): Promise<ProductModel[]>{
          let orderField  = "created_at";
          let order = 'DESC';

            if(orderBy.length> 0 && orderBy=="new"){
              orderField  = "created_at";
              order = "DESC";
            }
            let data = await this._productModel.findAll({
                include: [
                    {
                      model: CategoryModel,
                      attributes: {
                        exclude: [
                          "deleted_at",
                        ],
                      },
                    },
                    {
                      model: BrandModel,
                      attributes: {
                        exclude: [
                          "deleted_at",
                        ],
                      },
                    },
                    {
                      model: ProductPhotoModel,
                      attributes: {
                        include:["id","url"],
                        exclude: ["deleted_at"],
                      },
                    }
                ],
                order: [Sequelize.fn( 'RAND' )]
              });
              // console.log('data', data)
          return data;
        }
    
        async findAllWithParams(orderBy=""): Promise<ProductModel[]>{
          let orderField  = "created_at";
          let order = "DESC";

            if(orderBy.length> 0 && orderBy=="new"){
              orderField  = "created_at";
              order = "DESC";
            }

            let data = await this._productModel.findAll({
                include: [
                    {
                      model: CategoryModel,
                      attributes: {
                        exclude: [
                          "deleted_at",
                        ],
                      },
                    },
                    {
                      model: BrandModel,
                      attributes: {
                        exclude: [
                          "deleted_at",
                        ],
                      },
                    },
                    {
                      model: ProductPhotoModel,
                      attributes: {
                        exclude: ["deleted_at"],
                      },
                    }
                ],
                order: [[`${orderField}`, `${order}`]]
              });
          return data;
        }

        async findByCategory(id:string): Promise<ProductModel[]>{
          return await this._productModel.findAll({
            include: [
                    {
                      model: CategoryModel,
                      attributes: {
                        exclude: [
                          "deleted_at",
                        ],
                      },
                    },
                    {
                      model: BrandModel,
                      attributes: {
                        exclude: [
                          "deleted_at",
                        ],
                      },
                    },
                    {
                      model: ProductPhotoModel,
                      attributes: {
                        include:["id","url"],
                        exclude: ["deleted_at"],
                      }
                    }
                ],
                where: { categoryId: id } 
            });
        }
    
        async findOne(id:string): Promise<ProductModel>{
            return await this._productModel.findOne({ 
                include: [
                    {
                      model: CategoryModel,
                      attributes: {
                        exclude: [
                          "deleted_at",
                        ],
                      },
                    },
                    {
                      model: BrandModel,
                      attributes: {
                        exclude: [
                          "deleted_at",
                        ],
                      },
                    },
                    {
                      model: ProductPhotoModel,
                      attributes: {
                        include:["id","url"],
                        exclude: ["deleted_at"],
                      }
                    }
                ],
                where: { id: id } 
            });
        }
    
        async delete(id:string){
            const softDeleted = await this._productModel.destroy({
                where: { id: id },
              });
    
              return "Product deleted";
        }
    

}
