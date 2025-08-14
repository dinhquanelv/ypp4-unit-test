import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('AccountWorkspace')
export class AccountWorkspace {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'AccountId', type: 'integer' })
  accountId: number;

  @Column({ name: 'WorkspaceId', type: 'integer' })
  workspaceId: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
