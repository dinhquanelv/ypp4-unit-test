import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Workspace } from '../../entities/workspace.entity';
import { FindAllWorkspaceByAccountIdDto } from '../../modules/workspace/dto/find-all-workspace-by-account-id.dto';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async findAllWorkspacesByAccountId(
    accountId: number,
  ): Promise<FindAllWorkspaceByAccountIdDto[]> {
    const workspaces: FindAllWorkspaceByAccountIdDto[] =
      await this.workspaceRepository.query(
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
    return workspaces;
  }
}
