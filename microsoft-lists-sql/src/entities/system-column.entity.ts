import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('SystemColumn')
export class SystemColumn {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ColumnName', type: 'text' })
  columnName: string;

  @Column({ name: 'ColumnDescription', type: 'text' })
  columnDescription: string;

  @Column({ name: 'DisplayOrder', type: 'integer' })
  displayOrder: number;

  @Column({ name: 'SystemDataTypeId', type: 'integer' })
  systemDataTypeId: number;

  @Column({ name: 'IsVisible', type: 'boolean' })
  isVisible: boolean;

  @Column({ name: 'IsRequired', type: 'boolean' })
  isRequired: boolean;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
