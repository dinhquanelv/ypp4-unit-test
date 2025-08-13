import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ListType } from './list-type.entity';
import { TemplateProvider } from './template-provider.entity';

@Entity('ListTemplate')
export class ListTemplate {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Title', type: 'text', length: 255, nullable: false })
  title: string;

  @Column({ name: 'HeaderImage', type: 'text', length: 255, nullable: false })
  headerImage: string;

  @Column({
    name: 'TemplateDescription',
    type: 'text',
    length: 255,
    nullable: true,
  })
  templateDescription?: string;

  @Column({ name: 'Icon', type: 'text', length: 255, nullable: true })
  icon?: string;

  @Column({ name: 'Color', type: 'text', length: 255, nullable: true })
  color?: string;

  @Column({ name: 'Summary', type: 'text', length: 255, nullable: true })
  summary?: string;

  @Column({ name: 'Feature', type: 'text', length: 255, nullable: true })
  feature?: string;

  @Column({ name: 'ListTypeId', type: 'integer', nullable: false })
  listTypeId: number;

  @Column({ name: 'TemplateProviderId', type: 'integer', nullable: false })
  templateProviderId: number;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'text',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'text',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => ListType)
  @JoinColumn({ name: 'ListTypeId' })
  listType: ListType;

  @ManyToOne(() => TemplateProvider)
  @JoinColumn({ name: 'TemplateProviderId' })
  templateProvider: TemplateProvider;
}
