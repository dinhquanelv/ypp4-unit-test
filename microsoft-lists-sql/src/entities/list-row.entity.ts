import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListRow')
export class ListRow {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListId', type: 'integer' })
  listId: number;

  @Column({ name: 'DisplayOrder', type: 'integer' })
  displayOrder: number;

  @Column({ name: 'CreatedBy', type: 'integer' })
  createdBy: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
