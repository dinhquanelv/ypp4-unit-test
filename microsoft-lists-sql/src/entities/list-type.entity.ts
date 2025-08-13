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

  @Column({ name: 'Title', type: 'text', length: 255, nullable: false })
  title: string;

  @Column({ name: 'Icon', type: 'text', length: 100, nullable: true })
  icon?: string;

  @Column({ name: 'HeaderImage', type: 'text', length: 255, nullable: true })
  headerImage?: string;

  @Column({
    name: 'ListTypeDescription',
    type: 'text',
    length: 1000,
    nullable: true,
  })
  listTypeDescription?: string;

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
}
