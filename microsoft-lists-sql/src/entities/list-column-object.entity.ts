import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListColumnObject')
export class ListColumnObject {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListDynamicColumnId', type: 'integer' })
  listDynamicColumnId: number;

  @Column({ name: 'DisplayName', type: 'text' })
  displayName: string;

  @Column({ name: 'DisplayColor', type: 'text' })
  displayColor: string;

  @Column({ name: 'DisplayOrder', type: 'integer' })
  displayOrder: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
