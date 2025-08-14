import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListColumnSettingValue')
export class ListColumnSettingValue {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ColumnId', type: 'integer' })
  columnId: number;

  @Column({ name: 'DataTypeSettingKeyId', type: 'integer' })
  dataTypeSettingKeyId: number;

  @Column({ name: 'KeyValue', type: 'text' })
  keyValue: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
