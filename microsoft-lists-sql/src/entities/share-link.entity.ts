import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ShareLink')
export class ShareLink {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TargetUrl', type: 'text' })
  targetUrl: string;

  @Column({ name: 'ShareLinkMessage', type: 'text' })
  shareLinkMessage?: string;

  @Column({ name: 'ListId', type: 'integer' })
  listId: number;

  @Column({ name: 'ScopeId', type: 'integer' })
  scopeId: number;

  @Column({ name: 'PermissionId', type: 'integer' })
  permissionId: number;

  @Column({ name: 'CreatedBy', type: 'integer' })
  createdBy: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
