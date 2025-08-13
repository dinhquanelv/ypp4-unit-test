import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateRepository } from '../../modules/template/template.repository';
import { ListTemplate } from '../../entities/list-template.entity';

describe('TemplateController', () => {
  let controller: TemplateController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([ListTemplate]),
      ],
      controllers: [TemplateController],
      providers: [TemplateService, TemplateRepository],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByProviderId', () => {
    it('should find all templates by provider', async () => {
      const providerId = 1;
      const result = await controller.findByProviderId(providerId);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('headerImage');
      expect(result[0]).toHaveProperty('templateDescription');
    });

    it('should return null if no templates found', async () => {
      const providerId = -1;
      const result = await controller.findByProviderId(providerId);

      expect(result.length).toBe(0);
    });
  });
});
