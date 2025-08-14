import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DataTypeSettingKey } from './data-type-setting-key.entity';

@Entity('KeySetting')
export class KeySetting {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'KeyName', type: 'text', length: 100, nullable: false })
  keyName: string;

  @Column({ name: 'ValueType', type: 'text', length: 100, nullable: false })
  valueType: string;

  @Column({ name: 'DisplayName', type: 'text', length: 100, nullable: false })
  displayName: string;

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

  @OneToMany(() => DataTypeSettingKey, (dtsk) => dtsk.keySetting)
  dataTypeSettingKeys: DataTypeSettingKey[];
}
