import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Workspace } from '../../entities/workspace.entity';
import { WorkspaceDto } from './dto/workspace.dto';
import { CacheService } from '../../utils/cache.service';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    private readonly cacheService: CacheService,
  ) {}

  async findAllByAccountId(accountId: number): Promise<WorkspaceDto[]> {
    const cacheKey = `workspaces:${accountId}`;
    const cached = this.cacheService.get<WorkspaceDto[]>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.workspaceRepository.query(`PRAGMA read_uncommitted = 1`);
    const workspaces: WorkspaceDto[] = await this.workspaceRepository.query(
      `
        SELECT
          w.Id AS workspaceId,
          w.WorkspaceName AS workspaceName,
          w.Icon AS icon
        FROM
          Workspace w
          JOIN AccountWorkspace aw ON aw.WorkspaceId = w.Id
          JOIN Account a ON a.Id = aw.AccountId
        WHERE
          a.Id = ?
        `,
      [accountId],
    );

    this.cacheService.set(cacheKey, workspaces);

    return workspaces;
  }
}
