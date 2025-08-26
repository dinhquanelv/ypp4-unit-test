import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListTemplate')
export class ListTemplate {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Title', type: 'text' })
  title: string;

  @Column({ name: 'HeaderImage', type: 'text' })
  headerImage: string;

  @Column({ name: 'TemplateDescription', type: 'text' })
  templateDescription?: string;

  @Column({ name: 'Icon', type: 'text' })
  icon?: string;

  @Column({ name: 'Color', type: 'text' })
  color?: string;

  @Column({ name: 'Summary', type: 'text' })
  summary?: string;

  @Column({ name: 'Feature', type: 'text' })
  feature?: string;

  @Column({ name: 'ListTypeId', type: 'integer' })
  listTypeId: number;

  @Column({ name: 'TemplateProviderId', type: 'integer' })
  templateProviderId: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
