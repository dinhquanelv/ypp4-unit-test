import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TemplateColumn } from './template-column.entity';
import { TemplateSampleRow } from './template-sample-row.entity';

@Entity('TemplateSampleCellValue')
export class TemplateSampleCellValue {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TemplateColumnId', type: 'integer', nullable: false })
  templateColumnId: number;

  @Column({ name: 'TemplateSampleRowId', type: 'integer', nullable: false })
  templateSampleRowId: number;

  @Column({ name: 'CellValue', type: 'text', length: 255, nullable: true })
  cellValue?: string;

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

  @ManyToOne(() => TemplateColumn)
  @JoinColumn({ name: 'TemplateColumnId' })
  templateColumn: TemplateColumn;

  @ManyToOne(() => TemplateSampleRow)
  @JoinColumn({ name: 'TemplateSampleRowId' })
  templateSampleRow: TemplateSampleRow;
}
