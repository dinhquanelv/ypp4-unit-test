import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListCellValue')
export class ListCellValue {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListRowId', type: 'integer' })
  listRowId: number;

  @Column({ name: 'ListDynamicColumnId', type: 'integer' })
  listDynamicColumnId: number;

  @Column({ name: 'CellValue', type: 'text' })
  cellValue?: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
