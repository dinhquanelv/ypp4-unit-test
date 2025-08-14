import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ListType')
export class ListType {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Title', type: 'text' })
  title: string;

  @Column({ name: 'Icon', type: 'text' })
  icon?: string;

  @Column({ name: 'HeaderImage', type: 'text' })
  headerImage?: string;

  @Column({ name: 'ListTypeDescription', type: 'text' })
  listTypeDescription?: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
