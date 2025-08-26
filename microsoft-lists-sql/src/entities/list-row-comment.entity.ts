import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListRowComment')
export class ListRowComment {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListRowId', type: 'integer' })
  listRowId: number;

  @Column({ name: 'Content', type: 'text' })
  content: string;

  @Column({ name: 'CreatedBy', type: 'integer' })
  createdBy: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
