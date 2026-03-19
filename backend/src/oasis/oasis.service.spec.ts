import { Test, TestingModule } from '@nestjs/testing';
import { OasisService } from './oasis.service';

describe('OasisService', () => {
  let service: OasisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OasisService],
    }).compile();

    service = module.get<OasisService>(OasisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
