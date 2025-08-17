import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { Workspace } from '../../entities/workspace.entity';
import { WorkspaceRepository } from './workspace.repository';
import { CacheService } from '../../utils/cache.service';

describe('WorkspaceController', () => {
  let controller: WorkspaceController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([Workspace]),
      ],
      controllers: [WorkspaceController],
      providers: [WorkspaceService, WorkspaceRepository, CacheService],
    }).compile();

    controller = module.get<WorkspaceController>(WorkspaceController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByAccountId', () => {
    it('should return workspaces if accountId is valid', async () => {
      const accountId = 1;
      const result = await controller.findAllByAccountId(accountId);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return an empty array if accountId is invalid', async () => {
      const accountId = -1;
      const result = await controller.findAllByAccountId(accountId);

      expect(result).toEqual([]);
    });
  });
});
