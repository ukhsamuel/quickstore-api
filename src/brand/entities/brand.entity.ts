import { Table, Column, Model, DataType, BelongsTo,HasMany,PrimaryKey } from 'sequelize-typescript';
import { ProductModel } from '../../product/entities/product.entity';

@Table({
    modelName: 'brands'
})


export class BrandModel extends Model {

   
    // @PrimaryKey
    // @AutoIncrement
    // @Column
    // ({
    //     type: DataType.INTEGER,
    //     allowNull: true,
    //     autoIncrement: true,
    //     unique: true,
    //     primaryKey: true
    // })
    // id: string

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Brand needs a name" },
        },
    })
    name: string;


    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Brand needs a photo" },
        },
    })
    photo: string;

    @HasMany(() => ProductModel, 'categoryId')
    category: ProductModel;
}

 