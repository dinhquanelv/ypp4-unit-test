import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('TemplateColumn')
export class TemplateColumn {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ColumnName', type: 'text' })
  columnName: string;

  @Column({ name: 'ColumnDescription', type: 'text' })
  columnDescription?: string;

  @Column({ name: 'DisplayOrder', type: 'integer' })
  displayOrder: number;

  @Column({ name: 'IsVisible', type: 'boolean' })
  isVisible: boolean;

  @Column({ name: 'SystemDataTypeId', type: 'integer' })
  systemDataTypeId: number;

  @Column({ name: 'ListTemplateId', type: 'integer' })
  listTemplateId: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
