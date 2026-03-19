import { Test, TestingModule } from '@nestjs/testing';
import { OasisController } from './oasis.controller';

describe('OasisController', () => {
  let controller: OasisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OasisController],
    }).compile();

    controller = module.get<OasisController>(OasisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
