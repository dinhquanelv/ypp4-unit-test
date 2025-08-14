import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SystemDataType } from './system-data-type.entity';
import { KeySetting } from './key-setting.entity';

@Entity('DataTypeSettingKey')
export class DataTypeSettingKey {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'SystemDataTypeId', type: 'integer', nullable: false })
  systemDataTypeId: number;

  @Column({ name: 'KeySettingId', type: 'integer', nullable: false })
  keySettingId: number;

  @ManyToOne(() => SystemDataType, (sdt) => sdt.dataTypeSettingKeys, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'SystemDataTypeId' })
  systemDataType: SystemDataType;

  @ManyToOne(() => KeySetting, (ks) => ks.dataTypeSettingKeys, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'KeySettingId' })
  keySetting: KeySetting;

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
}
