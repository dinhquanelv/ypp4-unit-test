import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListView } from '../../entities/list-view.entity';
import { FindAllViewsByListIdDto } from './dto/find-all-views-by-list-id.dto';
import { FindAllViewTypesDto } from './dto/find-all-view-types.dto';
import { FindOneViewByIdDto } from './dto/find-one-view-by-id.dto';

@Injectable()
export class ListViewRepository {
  constructor(
    @InjectRepository(ListView)
    private readonly listViewRepository: Repository<ListView>,
  ) {}

  async findAllViewsByListId(
    listId: number,
  ): Promise<FindAllViewsByListIdDto[]> {
    const views: FindAllViewsByListIdDto[] =
      await this.listViewRepository.query(``);
    return views;
  }

  async findAllViewTypes(): Promise<FindAllViewTypesDto[]> {
    const views: FindAllViewTypesDto[] =
      await this.listViewRepository.query(``);
    return views;
  }

  async findOneViewById(
    listViewId: number,
  ): Promise<FindOneViewByIdDto | null> {
    const view: FindOneViewByIdDto[] = await this.listViewRepository.query(``);
    return view.length > 0 ? view[0] : null;
  }
}
