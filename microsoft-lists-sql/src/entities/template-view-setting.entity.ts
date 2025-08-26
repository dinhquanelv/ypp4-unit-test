import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('TemplateViewSetting')
export class TemplateViewSetting {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TemplateViewId', type: 'integer' })
  templateViewId: number;

  @Column({ name: 'ViewTypeSettingId', type: 'integer' })
  viewTypeSettingId: number;

  @Column({ name: 'GroupByColumnId', type: 'integer' })
  groupByColumnId?: number;

  @Column({ name: 'RawValue', type: 'text' })
  rawValue?: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
