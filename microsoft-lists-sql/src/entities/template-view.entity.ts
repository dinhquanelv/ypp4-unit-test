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
import { ViewType } from './view-type.entity';

@Entity('TemplateView')
export class TemplateView {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ViewName', type: 'text', length: 255, nullable: false })
  viewName: string;

  @Column({ name: 'ListTemplateId', type: 'integer', nullable: false })
  listTemplateId: number;

  @Column({ name: 'ViewTypeId', type: 'integer', nullable: false })
  viewTypeId: number;

  @Column({ name: 'DisplayOrder', type: 'integer', nullable: false })
  displayOrder: number;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'text',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'text',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => ListTemplate)
  @JoinColumn({ name: 'ListTemplateId' })
  listTemplate: ListTemplate;

  @ManyToOne(() => ViewType)
  @JoinColumn({ name: 'ViewTypeId' })
  viewType: ViewType;
}
