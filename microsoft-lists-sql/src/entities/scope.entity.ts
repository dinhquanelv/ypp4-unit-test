import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Scope')
export class Scope {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ScopeCode', type: 'text', unique: true })
  scopeCode: string;

  @Column({ name: 'ScopeName', type: 'text' })
  scopeName: string;

  @Column({ name: 'ScopeIcon', type: 'text' })
  scopeIcon?: string;

  @Column({ name: 'ScopeDescription', type: 'text' })
  scopeDescription?: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
