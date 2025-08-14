import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { SystemDataType } from './system-data-type.entity';
import { ListTemplate } from './list-template.entity';

@Entity('TemplateColumn')
export class TemplateColumn {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ColumnName', type: 'text', length: 255, nullable: false })
  columnName: string;

  @Column({
    name: 'ColumnDescription',
    type: 'text',
    length: 500,
    nullable: true,
  })
  columnDescription?: string;

  @Column({ name: 'DisplayOrder', type: 'integer', default: 0 })
  displayOrder: number;

  @Column({ name: 'IsVisible', type: 'boolean', default: true })
  isVisible: boolean;

  @Column({ name: 'SystemDataTypeId', type: 'integer', nullable: false })
  systemDataTypeId: number;

  @Column({ name: 'ListTemplateId', type: 'integer', nullable: false })
  listTemplateId: number;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'text',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'text',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => SystemDataType)
  @JoinColumn({ name: 'SystemDataTypeId' })
  systemDataType: SystemDataType;

  @ManyToOne(() => ListTemplate)
  @JoinColumn({ name: 'ListTemplateId' })
  listTemplate: ListTemplate;
}
