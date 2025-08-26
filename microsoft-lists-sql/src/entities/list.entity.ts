import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('List')
export class List {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListName', type: 'text' })
  listName: string;

  @Column({ name: 'Icon', type: 'text' })
  icon: string;

  @Column({ name: 'Color', type: 'text' })
  color: string;

  @Column({ name: 'ListTypeId', type: 'integer' })
  listTypeId: number;

  @Column({ name: 'WorkspaceId', type: 'integer' })
  workspaceId: number;

  @Column({ name: 'TemplateId', type: 'integer' })
  templateId?: number;

  @Column({ name: 'CreatedBy', type: 'integer' })
  createdBy: number;

  @CreateDateColumn({ name: 'AccessedAt', type: 'text' })
  accessedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
