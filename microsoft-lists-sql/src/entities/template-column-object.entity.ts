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

@Entity('TemplateColumnObject')
export class TemplateColumnObject {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TemplateColumnId', type: 'integer', nullable: false })
  templateColumnId: number;

  @Column({ name: 'DisplayName', type: 'text', length: 255, nullable: false })
  displayName: string;

  @Column({ name: 'DisplayColor', type: 'text', length: 20, nullable: true })
  displayColor?: string;

  @Column({ name: 'DisplayOrder', type: 'integer', default: 1 })
  displayOrder: number;

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
}
