import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListViewController } from './list-view.controller';
import { ListViewService } from './list-view.service';
import { ListView } from '../../entities/list-view.entity';
import { ListViewRepository } from './list-view.repository';

describe('ListViewController', () => {
  let controller: ListViewController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([ListView]),
      ],
      controllers: [ListViewController],
      providers: [ListViewService, ListViewRepository],
    }).compile();

    controller = module.get<ListViewController>(ListViewController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
