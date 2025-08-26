import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('KeySetting')
export class KeySetting {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'KeyName', type: 'text' })
  keyName: string;

  @Column({ name: 'ValueType', type: 'text' })
  valueType: string;

  @Column({ name: 'DisplayName', type: 'text' })
  displayName: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
