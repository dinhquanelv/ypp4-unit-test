import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListDynamicColumn')
export class ListDynamicColumn {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ColumnName', type: 'text' })
  columnName: string;

  @Column({ name: 'ColumnDescription', type: 'text' })
  columnDescription: string;

  @Column({ name: 'DisplayOrder', type: 'integer' })
  displayOrder: number;

  @Column({ name: 'IsVisible', type: 'boolean' })
  isVisible: boolean;

  @Column({ name: 'IsRequired', type: 'boolean' })
  isRequired: boolean;

  @Column({ name: 'CreatedBy', type: 'integer' })
  createdBy: number;

  @Column({ name: 'ListId', type: 'integer' })
  listId: number;

  @Column({ name: 'SystemDataTypeId', type: 'integer' })
  systemDataTypeId: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
