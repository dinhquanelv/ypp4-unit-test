import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateRepository } from './template.repository';
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

  describe('findAllByProviderId', () => {
    it('should find all templates by provider', async () => {
      const providerId = 1;
      const result = await controller.findAllByProviderId(providerId);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('headerImage');
        expect(item).toHaveProperty('templateDescription');
      });
    });

    it('should return null if no templates found', async () => {
      const providerId = -1;
      const result = await controller.findAllByProviderId(providerId);

      expect(result.length).toBe(0);
    });
  });

  describe('findOneTemplateById', () => {
    it('should return a template if template exists', async () => {
      const templateId = 1;
      const result = await controller.findOneTemplateById(templateId);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('templateId');
      expect(result).toHaveProperty('icon');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('summary');
      expect(result).toHaveProperty('feature');
    });

    it('should return null if template not found', async () => {
      const templateId = -1;
      const result = await controller.findOneTemplateById(templateId);

      expect(result).toBeNull();
    });
  });

  describe('findAllColumnsByListTemplateId', () => {
    it('should return all columns if template exists', async () => {
      const listTemplateId = 1;
      const result =
        await controller.findAllColumnsByListTemplateId(listTemplateId);

      expect(result).toBeDefined();
      result.forEach((item) => {
        expect(item).toHaveProperty('templateColumnId');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('columnName');
      });
    });

    it('should return an empty array if template not found', async () => {
      const listTemplateId = -1;
      const result =
        await controller.findAllColumnsByListTemplateId(listTemplateId);

      expect(result).toEqual([]);
    });
  });

  describe('findAllViewsByListTemplateId', () => {
    it('should return all views if template exists', async () => {
      const listTemplateId = 1;
      const result =
        await controller.findAllViewsByListTemplateId(listTemplateId);

      expect(result).toBeDefined();
      result.forEach((item) => {
        expect(item).toHaveProperty('templateViewId');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('viewName');
      });
    });

    it('should return an empty array if template not found', async () => {
      const listTemplateId = -1;
      const result =
        await controller.findAllViewsByListTemplateId(listTemplateId);

      expect(result).toEqual([]);
    });
  });
});
