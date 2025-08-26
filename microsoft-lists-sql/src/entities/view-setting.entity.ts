import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ViewSetting')
export class ViewSetting {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'SettingKey', type: 'text' })
  settingKey: string;

  @Column({ name: 'DisplayName', type: 'text' })
  displayName: string;

  @Column({ name: 'ValueType', type: 'text' })
  valueType: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
