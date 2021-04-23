import { Body, Controller, Get, Param, Post,Delete,Put, UploadedFile,  HttpException, HttpStatus,UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './interfaces/category.interface';
import { CategoryService } from './category.service';
import {CategoryModel} from './entities';

@Controller('category')
export class CategoryController {
    constructor(
      private readonly categoryService: CategoryService
      ){}

    /**
     * Get all Categories
     */
    @Get()
    findAll(): Promise<CategoryModel[]> {
        return this.categoryService.findAll();
    }
  
    /**
     * Create Category
     * @param {string} data.Category.name the Category title
     *
     * @returns {[Promise<any> | null]} saved Category data
     */
    
     @Post()
     @ApiResponse({status: 201, description: 'success'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @ApiResponse({status: 403, description: 'access forbidden'})
     @ApiResponse({status: 500, description: 'server error'})
     @ApiOperation({summary: 'Create Category'})
     async create( @Body() data): Promise<any> {
  
       try {
          const category = await this.categoryService.create(data);
           return category;
       } catch (error) {
         console.log(error)
           throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
       }
     }  

  
  /**
   * Update Category
   * @param {string} data.Category.name the Category title
   *
   * @returns {[Promise<any> | null]} saved Category data
   */
  
   @Put(':id')
   @ApiResponse({status: 201, description: 'success'})
   @ApiResponse({status: 401, description: 'Unauthorized'})
   @ApiResponse({status: 403, description: 'access forbidden'})
   @ApiResponse({status: 500, description: 'server error'})
   @ApiOperation({summary: 'Update Category'})
   async update(@Param() {id}: any, @Body() data): Promise<any> {

     try {
        const brand = await this.categoryService.update(id,data);
         return brand;
     } catch (error) {
       console.log(error)
         throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }  
  

  /**
   * Deletes single Category 
   *
   * @param {Object} data
   * @param {number} data.Id the Category to be deleted
   *
   * @returns {[String | null]}
   */
   @Delete(':id')
   delete(@Param() {id}) {
     return this.categoryService.delete(id);
   }
   

}
