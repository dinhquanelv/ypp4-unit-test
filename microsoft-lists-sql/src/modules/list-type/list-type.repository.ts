import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListType } from '../../entities/list-type.entity';
import { FindAllListTypeDto } from './dto/find-all-list-type.dto';
import { FindOneListTypeDto } from './dto/find-one-list-type.dto';

@Injectable()
export class ListTypeRepository {
  constructor(
    @InjectRepository(ListType)
    private readonly listTypeRepository: Repository<ListType>,
  ) {}

  async findAllListType(): Promise<FindAllListTypeDto[]> {
    const lists: FindAllListTypeDto[] = await this.listTypeRepository.query(
      `
        SELECT
          Id AS id,
          Icon AS icon,
          Title AS title,
          ListTypeDescription AS listTypeDescription
        FROM
          ListType
        `,
    );
    return lists;
  }

  async findOneListType(
    listTypeId: number,
  ): Promise<FindOneListTypeDto | null> {
    const list: FindOneListTypeDto[] = await this.listTypeRepository.query(
      `
        SELECT
          Id AS listTypeId,
          Title AS title,
          ListTypeDescription AS listTypeDescription,
          HeaderImage AS headerImage
        FROM
          ListType
        WHERE
          Id = ?
        `,
      [listTypeId],
    );
    return list.length > 0 ? list[0] : null;
  }
}
