import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TemplateView } from './template-view.entity';
import { ViewTypeSetting } from './view-type-setting.entity';
import { TemplateColumn } from './template-column.entity';

@Entity('TemplateViewSetting')
export class TemplateViewSetting {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TemplateViewId', type: 'integer', nullable: false })
  templateViewId: number;

  @Column({ name: 'ViewTypeSettingId', type: 'integer', nullable: false })
  viewTypeSettingId: number;

  @Column({ name: 'GroupByColumnId', type: 'integer', nullable: true })
  groupByColumnId?: number;

  @Column({ name: 'RawValue', type: 'text', length: 50, nullable: true })
  rawValue?: string;

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

  @ManyToOne(() => TemplateView)
  @JoinColumn({ name: 'TemplateViewId' })
  templateView: TemplateView;

  @ManyToOne(() => ViewTypeSetting)
  @JoinColumn({ name: 'ViewTypeSettingId' })
  viewTypeSetting: ViewTypeSetting;

  @ManyToOne(() => TemplateColumn)
  @JoinColumn({ name: 'GroupByColumnId' })
  groupByColumn?: TemplateColumn;
}
