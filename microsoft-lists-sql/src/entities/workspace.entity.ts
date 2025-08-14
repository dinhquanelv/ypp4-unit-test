import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Workspace')
export class Workspace {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'WorkspaceName', type: 'text' })
  workspaceName: string;

  @Column({ name: 'Icon', type: 'text' })
  icon?: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
