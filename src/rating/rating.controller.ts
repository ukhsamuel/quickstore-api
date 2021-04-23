import { Body, Controller, Get, Param, Post,Delete,Put, UploadedFile,  HttpException, HttpStatus,UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rating } from './interfaces/rating.interface';
import { RatingService } from './rating.service';
import {RatingModel} from './entities';

@Controller('rating')
export class RatingController {
    constructor(
      private readonly ratingService: RatingService
      ){}


    /**
     * Get all Ratings
     */
     @Get()
     findAll(): Promise<RatingModel[]> {
         return this.ratingService.findAll();
     }
   
     /**
      * Create Rating
      * @param {string} data the Rating title
      *
      * @returns {[Promise<any> | null]} saved Rating data
      */
     
      @Post()
      @ApiResponse({status: 201, description: 'success'})
      @ApiResponse({status: 401, description: 'Unauthorized'})
      @ApiResponse({status: 403, description: 'access forbidden'})
      @ApiResponse({status: 500, description: 'server error'})
      @ApiOperation({summary: 'Create Rating'})
      async create( @Body() data): Promise<any> {
   
        try {
           const rating = await this.ratingService.create(data);
            return rating;
        } catch (error) {
          console.log(error)
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }  
 
   
   /**
    * Update Rating
    * @param {string} data.Rating.name the Rating title
    *
    * @returns {[Promise<any> | null]} saved Rating data
    */
   
    @Put(':id')
    @ApiResponse({status: 201, description: 'success'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'access forbidden'})
    @ApiResponse({status: 500, description: 'server error'})
    @ApiOperation({summary: 'Update Rating'})
    async update(@Param() {id}: any, @Body() data): Promise<any> {
 
      try {
         const rating = await this.ratingService.update(id,data);
          return rating;
      } catch (error) {
        console.log(error)
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }  
   
 
   /**
    * Deletes single Rating 
    *
    * @param {Object} data
    * @param {number} data.Id the Rating to be deleted
    *
    * @returns {[String | null]}
    */
    @Delete(':id')
    delete(@Param() {id}) {
      return this.ratingService.delete(id);
    }
    
}
