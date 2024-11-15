import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DbService } from './db.service';
import { CreateDbDto, UpdateDbDto } from './dto/create-db.dto';


@Controller('')
export class DbController {
  deleteAll: any;
  constructor(private readonly dbService: DbService) { }

  @Post('/create')
  create(@Body() dto: CreateDbDto) {
    return this.dbService.create(dto);
  }

  @Get('/get')
  findAll() {
    return this.dbService.findAll();
  }

  @Get('/get/:id')
  async getUser(
    @Param('id') id: string,
    @Query() filters: any,
  ) {
    const parsedId = parseInt(id, 10); 
    if (isNaN(parsedId)) {
      return {
        success: false,
        result: { error: 'Неправильный ID' },
      };
    }

    return this.dbService.getUserById(parsedId, filters);
  }

  @Get('/get')
  async getUsers(@Query() filters: any) {
    return this.dbService.getUsersByFilters(filters);
  }




  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateDbDto: UpdateDbDto) {
    return this.dbService.update(+id, updateDbDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.dbService.delete(+id);
  }

  @Delete('/delete')
  removeAll() {
    return this.dbService.deleteAll();
  }

}
