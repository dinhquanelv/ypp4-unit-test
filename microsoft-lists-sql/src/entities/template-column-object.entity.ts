import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('TemplateColumnObject')
export class TemplateColumnObject {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TemplateColumnId', type: 'integer' })
  templateColumnId: number;

  @Column({ name: 'DisplayName', type: 'text' })
  displayName: string;

  @Column({ name: 'DisplayColor', type: 'text' })
  displayColor?: string;

  @Column({ name: 'DisplayOrder', type: 'integer' })
  displayOrder: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
