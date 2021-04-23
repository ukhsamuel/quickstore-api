import { Body, Controller, Get, Param, Post,Delete,Put, UploadedFile,UploadedFiles,  HttpException, HttpStatus,UseInterceptors, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';
import { ImageUploadService } from '../utils/uploads';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {ProductModel} from './entities';

@Controller('product')
export class ProductController {

    constructor(
      private readonly productService: ProductService,
      private readonly imageUploadService: ImageUploadService
      ){}

      /**
     * Get all Product
     */
    @Get()
    findAll(@Query() query): Promise<ProductModel[]> {
      console.log(query)
      if(query && query.orderBy){
        return this.productService.findAllWithParams(query.orderBy);
      }else{
        return this.productService.findAll();
      }
    }

  //   /**
  //  * Get new Product 
  //  */
  //     @Get('new')
  //     findAllWithParams(): Promise<ProductModel[]> {
  //         return this.productService.findAllWithParams();
  //     }
    /**
     * Get all Product
     */
     @Get('category/:id')
     findByCategory(@Param() {id}: any): Promise<ProductModel[]> {
         return this.productService.findByCategory(id);
     }
     /**
      * Get all Product
      */
     @Get(':id')
     findOne(@Param() {id}: any): Promise<ProductModel> {
         return this.productService.findOne(id);
     }

    /**
     * Create Product
     * @param {string} data.ProductData.name the Product title
     * @param {string} data.ProductData.photo the Product content
     *
     * @returns {[Promise<any> | null]} saved Product data
     */
    
     @Post()
     @UseInterceptors(FileInterceptor('photo'))
     @ApiConsumes('multipart/form-data')
     // @CreateProductApiBody('photo')
     @ApiResponse({status: 201, description: 'success'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @ApiResponse({status: 403, description: 'access forbidden'})
     @ApiResponse({status: 500, description: 'server error'})
     @ApiOperation({summary: 'Create Product'})
     async create( @UploadedFile() file: Express.Multer.File, @Body() createItemDto): Promise<any> {
  
       try {
         let photo: any;
          if(file){
             photo =  await this.imageUploadService.assetsPhotoUpload(file);
          }
          const data = await this.productService.create(photo, createItemDto);
           return data;
       } catch (error) {
         console.log(error)
           throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
       }
     }
     /**
      * Create Product
      * @param {string} data.ProductData.photo 
      *
      * @returns {[Promise<any> | null]} saved Product data
      */
     
      @Post('upload/:id')
      @UseInterceptors(FileInterceptor('photo'))
      @ApiConsumes('multipart/form-data')
      @ApiResponse({status: 201, description: 'success'})
      @ApiResponse({status: 401, description: 'Unauthorized'})
      @ApiResponse({status: 403, description: 'access forbidden'})
      @ApiResponse({status: 500, description: 'server error'})
      @ApiOperation({summary: 'Create Product Photo'})
      async uploadProductPhoto( @Param() {id}: any, @UploadedFile() file: Express.Multer.File): Promise<any> {
   
        try {
          let photo: any;
           if(file){
              photo =  await this.imageUploadService.assetsPhotoUpload(file);
              console.log(photo)
           }
           const data = await this.productService.addProductPhoto(photo, id);
            return data;
        } catch (error) {
          console.log(error)
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    //  /**
    //   * Upload Photos
    //   * 
    //   * @param {array} data.photo the Product photo array
    //   *
    //   * @returns {[Promise<any> | null]} saved Product data
    //   */
     
    // //   @Post('uploads/:id')
    //   @Post('uploads')
    //   @UseInterceptors(FilesInterceptor('files[]'))
    //   @ApiConsumes('multipart/form-data')
    //   // @CreateProductApiBody('photo')
    //   @ApiResponse({status: 201, description: 'success'})
    //   @ApiResponse({status: 401, description: 'Unauthorized'})
    //   @ApiResponse({status: 403, description: 'access forbidden'})
    //   @ApiResponse({status: 500, description: 'server error'})
    //   @ApiOperation({summary: 'Create Product'})
    // //   async upload( @UploadedFile() file: Express.Multer.File): Promise<any> {
    // async upload( @UploadedFiles() images): Promise<any> {
    //         console.log('files: ')
    //     console.log('files: ',images)
    //     try {   
    //       let photo: any;
    //     //    if(file){
    //           photo =  await this.imageUploadService.assetsPhotoUpload(file);
    //     //    }
    //     //    const data = await this.productService.create(photo,1);
    //         return true;
    //     } catch (error) {
    //       console.log(error)
    //         throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    //   }
   
  


}
