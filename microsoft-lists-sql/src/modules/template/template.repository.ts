import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListTemplate } from '../../entities/list-template.entity';
import { TemplateDto } from './dto/template.dto';
import { TemplateDetailDto } from './dto/template-detail.dto';
import { ColumnDto } from './dto/column.dto';
import { SampleCellValue } from './dto/sample-cell-value.dto';
import { ViewDto } from './dto/view.dto';
import { CacheService } from '../../common/utils/cache.util';

@Injectable()
export class TemplateRepository {
  constructor(
    @InjectRepository(ListTemplate)
    private readonly listTemplateRepository: Repository<ListTemplate>,
    private readonly cacheService: CacheService,
  ) {}

  async findAllByProviderId(providerId: number): Promise<TemplateDto[]> {
    const cacheKey = `templates:${providerId}`;
    const cached = this.cacheService.get<TemplateDto[]>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.listTemplateRepository.query(`PRAGMA read_uncommitted = 1`);
    const templates: TemplateDto[] = await this.listTemplateRepository.query(
      `
      SELECT 
        Id as id, 
        Title as title, 
        HeaderImage as headerImage, 
        TemplateDescription as templateDescription
      FROM 
        ListTemplate 
      WHERE 
        TemplateProviderId = ?`,
      [providerId],
    );

    this.cacheService.set(cacheKey, templates);

    return templates;
  }

  async findOne(templateId: number): Promise<TemplateDetailDto | null> {
    const cacheKey = `template:${templateId}`;
    const cached = this.cacheService.get<TemplateDetailDto>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.listTemplateRepository.query(`PRAGMA read_uncommitted = 1`);
    const template: TemplateDetailDto[] =
      await this.listTemplateRepository.query(
        `
        SELECT
          Id AS templateId,
          Icon AS icon,
          Title AS title,
          Summary AS summary,
          Feature AS feature
        FROM
          ListTemplate
        WHERE
          Id = ?
        `,
        [templateId],
      );

    this.cacheService.set(cacheKey, template[0]);

    return template.length > 0 ? template[0] : null;
  }

  async findAllColumns(listTemplateId: number): Promise<ColumnDto[]> {
    const cacheKey = `templateColumns:${listTemplateId}`;
    const cached = this.cacheService.get<ColumnDto[]>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.listTemplateRepository.query(`PRAGMA read_uncommitted = 1`);
    const templateColumns: ColumnDto[] =
      await this.listTemplateRepository.query(
        `
        SELECT
          tc.Id AS templateColumnId,
          sdt.Icon AS icon,
          tc.ColumnName AS columnName
        FROM
          TemplateColumn tc
          JOIN SystemDataType sdt ON sdt.Id = tc.SystemDataTypeId
        WHERE
          tc.ListTemplateId = ?
        ORDER BY
          tc.DisplayOrder
        `,
        [listTemplateId],
      );

    this.cacheService.set(cacheKey, templateColumns);

    return templateColumns;
  }

  async findAllCellValues(listTemplateId: number): Promise<SampleCellValue[]> {
    await this.listTemplateRepository.query(`PRAGMA read_uncommitted = 1`);
    const columnsResult: { columns: string }[] =
      await this.listTemplateRepository.query(
        `
        SELECT 
          GROUP_CONCAT(DISTINCT Id) AS columns
        FROM 
          TemplateColumn
        WHERE 
          ListTemplateId = ?
      `,
        [listTemplateId],
      );

    const colList: string[] = columnsResult[0]?.columns?.split(',') || [];

    if (colList.length === 0) {
      return [];
    }

    const caseColumns: string = colList
      .map(
        (columnId: string) =>
          `MAX
            (CASE 
              WHEN 
                tc.Id = ${columnId} 
              THEN 
                tscv.CellValue 
            END) AS column_${columnId}`,
      )
      .join(', ');

    const sql = `
      SELECT 
        tsr.Id AS templateSampleRowId, ${caseColumns}
      FROM 
        TemplateSampleRow tsr
        CROSS JOIN TemplateColumn tc
        LEFT JOIN TemplateSampleCellValue tscv 
        ON tscv.TemplateSampleRowId = tsr.Id 
        AND tscv.TemplateColumnId = tc.Id
      WHERE 
        tsr.ListTemplateId = ? AND tc.ListTemplateId = ?
      GROUP BY 
        tsr.Id
      ORDER BY 
        tsr.Id
  `;

    return await this.listTemplateRepository.query(sql, [
      listTemplateId,
      listTemplateId,
    ]);
  }

  async findAllViews(listTemplateId: number): Promise<ViewDto[]> {
    const cacheKey = `templateViews:${listTemplateId}`;
    const cached = this.cacheService.get<ViewDto[]>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.listTemplateRepository.query(`PRAGMA read_uncommitted = 1`);
    const templateViews: ViewDto[] = await this.listTemplateRepository.query(
      `
        SELECT
          tv.Id AS templateViewId,
          vt.Icon AS icon,
          tv.ViewName AS viewName
        FROM
          TemplateView tv
          JOIN ViewType vt ON vt.Id = tv.ViewTypeId
        WHERE
          tv.ListTemplateId = ?
        ORDER BY
          tv.DisplayOrder
        `,
      [listTemplateId],
    );

    this.cacheService.set(cacheKey, templateViews);

    return templateViews;
  }
}
