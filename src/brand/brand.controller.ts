import { Body, Controller, Get, Param, Post,Delete,Put, UploadedFile,  HttpException, HttpStatus,UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandDto } from './dto/brand.dto';
import { Brand } from './interfaces/brand.interface';
import { BrandService } from './brand.service';
import { ImageUploadService } from '../utils/uploads';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('brand')
export class BrandController {
    constructor(
      private readonly brandService: BrandService,
      private readonly imageUploadService: ImageUploadService
      ){}

  /**
   * Get all brands
   */
    @Get()
    findAll(): Promise<Brand[]> {
      return this.brandService.findAll();
    }

  /**
   * Create Brand
   * @param {string} data.ProductData.name the Brand title
   * @param {string} data.ProductData.photo the Brand content
   *
   * @returns {[Promise<any> | null]} saved Brand data
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
        const brand = await this.brandService.create(photo, createItemDto);
         return brand;
     } catch (error) {
       console.log(error)
         throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }

   /**
    * Update Brand
    * @param {string} data.ProductData.name the Brand title
    * @param {string} data.ProductData.photo the Brand content
    *
    * @returns {[Promise<any> | null]} saved Brand data
    */
   
     @Put(':id')
     @UseInterceptors(FileInterceptor('photo'))
     @ApiConsumes('multipart/form-data')
     // @CreateProductApiBody('photo')
     @ApiResponse({status: 201, description: 'success'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @ApiResponse({status: 403, description: 'access forbidden'})
     @ApiResponse({status: 500, description: 'server error'})
     @ApiOperation({summary: 'Create Product'})
     async update( @Param() {id}: any,@UploadedFile() file: Express.Multer.File, @Body() createItemDto): Promise<any> {
 
       try {
         let photo: any;
          if(file){
             photo =  await this.imageUploadService.assetsPhotoUpload(file);
          }
          const brand = await this.brandService.update(id, photo, createItemDto);
           return brand;
       } catch (error) {
         console.log(error)
           throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
       }
     }

  /**
   * Deletes single brand 
   *
   * @param {Object} data
   * @param {number} data.brandId the brand to be deleted
   *
   * @returns {[String | null]}
   */
    @Delete(':id')
    delete(@Param() {id}) {
      return this.brandService.delete(id);
    }
    
}
