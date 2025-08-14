import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ViewType } from './view-type.entity';
import { ViewSetting } from './view-setting.entity';

@Entity('ViewTypeSetting')
export class ViewTypeSetting {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ViewTypeId', type: 'integer', nullable: false })
  viewTypeId: number;

  @Column({ name: 'ViewSettingId', type: 'integer', nullable: false })
  viewSettingId: number;

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

  @ManyToOne(() => ViewType, (viewType) => viewType.viewTypeSettings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ViewTypeId' })
  viewType: ViewType;

  @ManyToOne(() => ViewSetting, (viewSetting) => viewSetting.viewTypeSettings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ViewSettingId' })
  viewSetting: ViewSetting;
}
