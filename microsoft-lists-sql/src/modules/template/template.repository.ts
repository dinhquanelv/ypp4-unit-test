import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListTemplate } from '../../entities/list-template.entity';
import { FindAllByProviderIdDto } from './dto/find-all-by-provider-id.dto';
import { FindOneTemplateByIdDto } from './dto/find-one-template-by-id.dto';
import { FindAllColumnsByListTemplateIdDto } from './dto/find-all-columns-by-list-template-id.dto';
import { FindAllTemplateSampleCellValuesByListTemplateIdDto } from './dto/find-all-template-sample-cell-values-by-list-template-id.dto';
import { FindAllViewsByListTemplateIdDto } from './dto/find-all-views-by-list-template-id.dto';

@Injectable()
export class TemplateRepository {
  constructor(
    @InjectRepository(ListTemplate)
    private readonly listTemplateRepository: Repository<ListTemplate>,
  ) {}

  async findAllByProviderId(
    providerId: number,
  ): Promise<FindAllByProviderIdDto[]> {
    const templates: FindAllByProviderIdDto[] =
      await this.listTemplateRepository.query(
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

    return templates;
  }

  async findOneTemplateById(
    templateId: number,
  ): Promise<FindOneTemplateByIdDto | null> {
    const template: FindOneTemplateByIdDto[] =
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
    return template.length > 0 ? template[0] : null;
  }

  async findAllColumnsByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllColumnsByListTemplateIdDto[]> {
    const templateColumns: FindAllColumnsByListTemplateIdDto[] =
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
    return templateColumns;
  }

  async findAllTemplateSampleCellValuesByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllTemplateSampleCellValuesByListTemplateIdDto[]> {
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

  async findAllViewsByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllViewsByListTemplateIdDto[]> {
    const templateViews: FindAllViewsByListTemplateIdDto[] =
      await this.listTemplateRepository.query(
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
    return templateViews;
  }
}
