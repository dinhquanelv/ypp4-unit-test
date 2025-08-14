import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ShareLinkOptionValue')
export class ShareLinkOptionValue {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ShareLinkId', type: 'integer' })
  shareLinkId: number;

  @Column({ name: 'ShareLinkOptionId', type: 'integer' })
  shareLinkOptionId: number;

  @Column({ name: 'OptionValue', type: 'text' })
  optionValue: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
