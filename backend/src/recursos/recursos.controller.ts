import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecursosService } from './recursos.service';

@Controller('recursos')
export class RecursosController {
  constructor(private readonly recursosService: RecursosService) {}

  @Get()
  findAll(@Query('categoria') categoria?: string, @Query('tipo') tipo?: string) {
    return this.recursosService.findAll(categoria, tipo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recursosService.findOne(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.recursosService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: any) {
    return this.recursosService.uploadArchivo(file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.recursosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recursosService.remove(id);
  }
}
