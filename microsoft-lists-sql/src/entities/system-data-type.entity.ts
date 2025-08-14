import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DataTypeSettingKey } from './data-type-setting-key.entity';

@Entity('SystemDataType')
export class SystemDataType {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'DisplayName', type: 'text', length: 100, nullable: false })
  displayName: string;

  @Column({ name: 'DataTypeValue', type: 'text', length: 100, nullable: false })
  dataTypeValue: string;

  @Column({ name: 'Icon', type: 'text', length: 100, nullable: false })
  icon: string;

  @Column({
    name: 'TypeDescription',
    type: 'text',
    length: 100,
    nullable: false,
  })
  typeDescription: string;

  @Column({ name: 'CoverImage', type: 'text', length: 100, nullable: false })
  coverImage: string;

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

  @OneToMany(() => DataTypeSettingKey, (dtsk) => dtsk.systemDataType)
  dataTypeSettingKeys: DataTypeSettingKey[];
}
