import { Table, Column, Model, DataType, BelongsTo,HasMany,PrimaryKey } from 'sequelize-typescript';
import { RatingModel } from '../../rating/entities/rating.entity';
import { CategoryModel } from '../../category/entities/category.entity';
import { ProductPhotoModel } from './product-photo.entity';
import { BrandModel } from '../../brand/entities';

@Table({
    modelName: 'products'
})


export class ProductModel extends Model {


    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Product needs a name" },
        },
    })
    name: string;


    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Product needs a photo" },
        },
    })
    photo: string;


    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Product needs a description" },
        },
    })
    description: string;

    @Column({
        type: DataType.INTEGER(),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Please provide the product price" },
        },
    })
    price: string;

    @Column({
        type: DataType.INTEGER(),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Please provide the product category" },
        },
    })
    categoryId: string;

    @Column({
        type: DataType.INTEGER(),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Please provide the product brand" },
        },
    })
    brandId: string;

        
    @BelongsTo(() => CategoryModel, 'categoryId')
    category: CategoryModel;

        
    @BelongsTo(() => BrandModel, 'brandId')
    brand: BrandModel;


    @HasMany(() => RatingModel, 'productId')
    rating: RatingModel;
    

    @HasMany(() => ProductPhotoModel, 'productId')
    photos: ProductPhotoModel;
    
    
}

 