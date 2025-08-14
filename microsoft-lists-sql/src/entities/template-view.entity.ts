import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('TemplateView')
export class TemplateView {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ViewName', type: 'text' })
  viewName: string;

  @Column({ name: 'ListTemplateId', type: 'integer' })
  listTemplateId: number;

  @Column({ name: 'ViewTypeId', type: 'integer' })
  viewTypeId: number;

  @Column({ name: 'DisplayOrder', type: 'integer' })
  displayOrder: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
