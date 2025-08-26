import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListMemberPermission')
export class ListMemberPermission {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListId', type: 'integer' })
  listId: number;

  @Column({ name: 'AccountId', type: 'integer' })
  accountId: number;

  @Column({ name: 'HighestPermissionId', type: 'integer' })
  highestPermissionId: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
