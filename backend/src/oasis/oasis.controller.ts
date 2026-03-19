import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OasisService } from './oasis.service';

@Controller('oasis')
export class OasisController {
  constructor(private readonly oasisService: OasisService) {}

  @Post()
  create(@Body() createOasisDto: any) {
    return this.oasisService.create(createOasisDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: any) {
    return this.oasisService.uploadImage(file);
  }

  @Get()
  findAll() {
    return this.oasisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oasisService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.oasisService.findBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOasisDto: any) {
    return this.oasisService.update(id, updateOasisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oasisService.remove(id);
  }
}
