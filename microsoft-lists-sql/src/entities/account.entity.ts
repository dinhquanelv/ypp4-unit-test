import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Account')
export class Account {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'FirstName', type: 'text', length: 50 })
  firstName: string;

  @Column({ name: 'LastName', type: 'text', length: 100 })
  lastName: string;

  @Column({ name: 'Email', type: 'text', length: 100, unique: true })
  email: string;

  @Column({ name: 'AccountPassword', type: 'text', length: 50 })
  accountPassword: string;

  @Column({ name: 'Avatar', type: 'text', length: 255, nullable: true })
  avatar?: string;

  @Column({ name: 'Company', type: 'text', length: 255, nullable: true })
  company?: string;

  @Column({ name: 'AccountRole', type: 'text', length: 255, nullable: true })
  accountRole?: string;

  @Column({ name: 'AccountStatus', type: 'text', length: 50 })
  accountStatus: string;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
