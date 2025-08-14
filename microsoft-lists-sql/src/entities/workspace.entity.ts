import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Account } from './account.entity';

@Entity('Workspace')
export class Workspace {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'WorkspaceName', type: 'text', nullable: false })
  workspaceName: string;

  @Column({ name: 'Icon', type: 'text', nullable: true })
  icon?: string;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'text',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'text',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Account, (account) => account.workspaces)
  accounts: Account[];
}
