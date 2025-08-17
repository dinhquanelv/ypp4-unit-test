import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateRepository } from './template.repository';
import { ListTemplate } from '../../entities/list-template.entity';
import { CacheService } from '../../utils/cache.service';

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
      providers: [TemplateService, TemplateRepository, CacheService],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByProviderId', () => {
    it('should find all templates by provider', async () => {
      const providerId = 1;
      const result = await controller.findAllByProviderId(providerId);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return null if no templates found', async () => {
      const providerId = -1;
      const result = await controller.findAllByProviderId(providerId);

      expect(result.length).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should return a template if template exists', async () => {
      const templateId = 1;
      const result = await controller.findOne(templateId);

      expect(result).toBeDefined();
    });

    it('should return null if template not found', async () => {
      const templateId = -1;
      const result = await controller.findOne(templateId);

      expect(result).toBeNull();
    });
  });

  describe('findAllColumns', () => {
    it('should return all columns if template exists', async () => {
      const listTemplateId = 1;
      const result = await controller.findAllColumns(listTemplateId);

      expect(result).toBeDefined();
    });

    it('should return an empty array if template not found', async () => {
      const listTemplateId = -1;
      const result = await controller.findAllColumns(listTemplateId);

      expect(result).toEqual([]);
    });
  });

  describe('findAllCellValues', () => {
    it('should return all sample cell values if template exists', async () => {
      const listTemplateId = 1;
      const result = await controller.findAllCellValues(listTemplateId);

      expect(result).toBeDefined();
    });

    it('should return an empty array if template not found', async () => {
      const listTemplateId = -1;
      const result = await controller.findAllCellValues(listTemplateId);

      expect(result).toEqual([]);
    });
  });

  describe('findAllViews', () => {
    it('should return all views if template exists', async () => {
      const listTemplateId = 1;
      const result = await controller.findAllViews(listTemplateId);

      expect(result).toBeDefined();
    });

    it('should return an empty array if template not found', async () => {
      const listTemplateId = -1;
      const result = await controller.findAllViews(listTemplateId);

      expect(result).toEqual([]);
    });
  });
});
