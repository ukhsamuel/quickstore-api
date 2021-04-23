import { Table, Column, Model, DataType, BelongsTo,HasMany,PrimaryKey,AutoIncrement } from 'sequelize-typescript';
import { ProductModel } from '../../product/entities/product.entity';

@Table({
    modelName: 'ratings'
})

export class RatingModel extends Model {



    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Rating needs a name" },
        },
    })
    name: string;


    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Rating needs a email" },
        },
    })
    email: string;


    @Column({
        type: DataType.INTEGER(),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Your Rating needs a value" },
        },
    })
    rating: string;


    @Column({
        type: DataType.STRING(250),
        allowNull: true,
        validate: {
            notEmpty: { msg: "Your Rating needs a review" },
        },
    })
    review: string;


    @Column({
        type: DataType.INTEGER(),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Please provide the product ID" },
        },
    })
    productId: string;


    @BelongsTo(() => ProductModel, 'productId')
    product: ProductModel;
}

 