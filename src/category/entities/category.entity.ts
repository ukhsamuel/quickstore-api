import { Table, Column, Model, DataType, BelongsTo,HasMany,PrimaryKey,AutoIncrement } from 'sequelize-typescript';
import { ProductModel } from '../../product/entities/product.entity';

@Table({
    modelName: 'categories'
})

export class CategoryModel extends Model {



    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Brand needs a name" },
        },
    })
    name: string;


    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Brand needs a icon" },
        },
    })
    icon: string;



    @HasMany(() => ProductModel, 'categoryId')
    category: ProductModel;
    
}

 