import { Module } from '@nestjs/common';
import { MusicaController } from './musica.controller';
import { MusicaService } from './musica.service';

@Module({
  controllers: [MusicaController],
  providers: [MusicaService],
})
export class MusicaModule {}
