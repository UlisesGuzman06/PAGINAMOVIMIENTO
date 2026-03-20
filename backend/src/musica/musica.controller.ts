import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseInterceptors, UploadedFile, Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusicaService } from './musica.service';

@Controller('musica')
export class MusicaController {
  constructor(private readonly musicaService: MusicaService) {}

  @Get()
  findAll(@Query('categoria') categoria?: string) {
    return this.musicaService.findAll(categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicaService.findOne(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.musicaService.create(dto);
  }

  @Post('upload-audio')
  @UseInterceptors(FileInterceptor('file'))
  uploadAudio(@UploadedFile() file: any) {
    return this.musicaService.uploadAudio(file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.musicaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicaService.remove(id);
  }
}
