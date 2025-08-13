import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Workspace } from '../entities/workspace.entity';

@Entity('Account')
export class Account {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'FirstName', type: 'text', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'LastName', type: 'text', length: 100, nullable: false })
  lastName: string;

  @Column({
    name: 'Email',
    type: 'text',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'AccountPassword',
    type: 'text',
    length: 50,
    nullable: false,
  })
  accountPassword: string;

  @Column({ name: 'Avatar', type: 'text', length: 255, nullable: true })
  avatar?: string;

  @Column({ name: 'Company', type: 'text', length: 255, nullable: true })
  company?: string;

  @Column({
    name: 'AccountRole',
    type: 'text',
    length: 255,
    nullable: true,
  })
  accountRole?: string;

  @Column({
    name: 'AccountStatus',
    type: 'text',
    length: 50,
    nullable: false,
  })
  accountStatus: string;

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

  @ManyToMany(() => Workspace, (workspace) => workspace.accounts)
  @JoinTable({
    name: 'AccountWorkspace',
    joinColumn: {
      name: 'AccountId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'WorkspaceId',
      referencedColumnName: 'id',
    },
  })
  workspaces: Workspace[];
}
