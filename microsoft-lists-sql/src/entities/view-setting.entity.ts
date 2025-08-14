import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ViewTypeSetting } from './view-type-setting.entity';

@Entity('ViewSetting')
export class ViewSetting {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'SettingKey', type: 'text', length: 50, nullable: false })
  settingKey: string;

  @Column({ name: 'DisplayName', type: 'text', length: 100, nullable: false })
  displayName: string;

  @Column({ name: 'ValueType', type: 'text', length: 50, nullable: false })
  valueType: string;

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

  @OneToMany(
    () => ViewTypeSetting,
    (viewTypeSetting) => viewTypeSetting.viewSetting,
  )
  viewTypeSettings: ViewTypeSetting[];
}
