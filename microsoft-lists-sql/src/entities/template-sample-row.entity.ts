import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ListTemplate } from './list-template.entity';

@Entity('TemplateSampleRow')
export class TemplateSampleRow {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListTemplateId', type: 'integer', nullable: false })
  listTemplateId: number;

  @Column({ name: 'DisplayOrder', type: 'integer', nullable: false })
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

  @ManyToOne(() => ListTemplate)
  @JoinColumn({ name: 'ListTemplateId' })
  listTemplate: ListTemplate;
}
