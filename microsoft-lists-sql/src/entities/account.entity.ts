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

  @Column({ name: 'FirstName', type: 'text' })
  firstName: string;

  @Column({ name: 'LastName', type: 'text' })
  lastName: string;

  @Column({ name: 'Email', type: 'text' })
  email: string;

  @Column({ name: 'AccountPassword', type: 'text' })
  accountPassword: string;

  @Column({ name: 'Avatar', type: 'text' })
  avatar?: string;

  @Column({ name: 'Company', type: 'text' })
  company?: string;

  @Column({ name: 'AccountRole', type: 'text' })
  accountRole?: string;

  @Column({ name: 'AccountStatus', type: 'text' })
  accountStatus: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
