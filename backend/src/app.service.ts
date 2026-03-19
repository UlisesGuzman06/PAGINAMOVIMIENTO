import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Movimiento Juvenil Peregrino - API Backend is running! Access /oasis for data.';
  }
}
