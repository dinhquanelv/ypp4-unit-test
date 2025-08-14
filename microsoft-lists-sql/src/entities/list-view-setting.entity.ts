import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListViewSetting')
export class ListViewSetting {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ListViewId', type: 'integer' })
  listViewId: number;

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
