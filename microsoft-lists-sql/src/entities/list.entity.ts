import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ListType } from './list-type.entity';
import { Workspace } from './workspace.entity';
import { ListTemplate } from './list-template.entity';
import { Account } from './account.entity';

@Entity('List')
export class List {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListName', type: 'text', length: 255, nullable: false })
  listName: string;

  @Column({ name: 'Icon', type: 'text', length: 255, nullable: false })
  icon: string;

  @Column({ name: 'Color', type: 'text', length: 255, nullable: false })
  color: string;

  @Column({ name: 'ListTypeId', type: 'integer', nullable: false })
  listTypeId: number;

  @Column({ name: 'WorkspaceId', type: 'integer', nullable: false })
  workspaceId: number;

  @Column({ name: 'TemplateId', type: 'integer', nullable: true })
  templateId?: number;

  @Column({ name: 'CreatedBy', type: 'integer', nullable: false })
  createdBy: number;

  @Column({
    name: 'AccessedAt',
    type: 'text',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  accessedAt: Date;

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

  @ManyToOne(() => ListType)
  @JoinColumn({ name: 'ListTypeId' })
  listType: ListType;

  @ManyToOne(() => Workspace)
  @JoinColumn({ name: 'WorkspaceId' })
  workspace: Workspace;

  @ManyToOne(() => ListTemplate)
  @JoinColumn({ name: 'TemplateId' })
  listTemplate?: ListTemplate;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'CreatedBy' })
  createdByAccount: Account;
}
