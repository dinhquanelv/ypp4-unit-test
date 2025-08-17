import { Injectable } from '@nestjs/common';

import { WorkspaceDto } from './dto/workspace.dto';
import { WorkspaceRepository } from './workspace.repository';

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async findAllByAccountId(accountId: number): Promise<WorkspaceDto[]> {
    return await this.workspaceRepository.findAllByAccountId(accountId);
  }
}
