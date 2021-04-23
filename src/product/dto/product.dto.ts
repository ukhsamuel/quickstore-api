import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ProductDto{

    @ApiProperty({ example: 'string' })  
    @IsString()
    name: any;

    @ApiProperty({ example: 'string' })  
    @IsString()
    description: any;

    @ApiProperty({ example: 'string' })  
    @IsString()
    image: any;
}