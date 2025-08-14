import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ObjectType')
export class ObjectType {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ObjectCode', type: 'text' })
  objectCode?: string;

  @Column({ name: 'ObjectName', type: 'text' })
  objectName?: string;

  @Column({ name: 'ObjectIcon', type: 'text' })
  objectIcon?: string;

  @CreateDateColumn({ name: 'DeleteAt', type: 'text' })
  deleteAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
