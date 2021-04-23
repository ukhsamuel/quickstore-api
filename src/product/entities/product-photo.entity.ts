import { Table, Column, Model, DataType, BelongsTo,HasMany,PrimaryKey } from 'sequelize-typescript';
import { ProductModel } from '../../product/entities/product.entity';

@Table({
    modelName: 'galleries'
})


export class ProductPhotoModel extends Model {


    @Column({
        type: DataType.INTEGER(),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your photo needs a product id" },
        },
    })
    product_id: string;


    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Product needs a photo" },
        },
    })
    url: string;


        
    @BelongsTo(() => ProductModel, 'productId')
    category: ProductModel;
    
    
}

 