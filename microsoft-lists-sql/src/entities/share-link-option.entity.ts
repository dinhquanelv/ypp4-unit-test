import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ShareLinkOption')
export class ShareLinkOption {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'OptionName', type: 'text' })
  optionName: string;

  @Column({ name: 'ValueType', type: 'text' })
  valueType: string;

  @Column({ name: 'OptionValue', type: 'text' })
  optionValue?: string;

  @Column({ name: 'ScopeId', type: 'integer' })
  scopeId: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
