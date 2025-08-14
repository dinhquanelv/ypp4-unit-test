import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('TemplateSampleCellValue')
export class TemplateSampleCellValue {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TemplateColumnId', type: 'integer' })
  templateColumnId: number;

  @Column({ name: 'TemplateSampleRowId', type: 'integer' })
  templateSampleRowId: number;

  @Column({ name: 'CellValue', type: 'text' })
  cellValue?: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
