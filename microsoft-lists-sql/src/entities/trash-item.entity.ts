import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('TrashItem')
export class TrashItem {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ObjectId', type: 'integer' })
  objectId: number;

  @Column({ name: 'ObjectTypeId', type: 'integer' })
  objectTypeId: number;

  @Column({ name: 'PathItem', type: 'text' })
  pathItem?: string;

  @Column({ name: 'CreateBy', type: 'integer' })
  createBy: number;

  @Column({ name: 'DeletedBy', type: 'integer' })
  deletedBy: number;

  @CreateDateColumn({ name: 'DeleteAt', type: 'text' })
  deleteAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
