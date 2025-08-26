import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListView')
export class ListView {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ViewName', type: 'text' })
  viewName: string;

  @Column({ name: 'DisplayOrder', type: 'integer' })
  displayOrder: number;

  @Column({ name: 'ListId', type: 'integer' })
  listId: number;

  @Column({ name: 'ViewTypeId', type: 'integer' })
  viewTypeId: number;

  @Column({ name: 'CreatedBy', type: 'integer' })
  createdBy: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
