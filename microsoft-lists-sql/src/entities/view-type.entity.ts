import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ViewType')
export class ViewType {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TypeName', type: 'text' })
  typeName: string;

  @Column({ name: 'DisplayName', type: 'text' })
  displayName: string;

  @Column({ name: 'HeaderImage', type: 'text' })
  headerImage: string;

  @Column({ name: 'Icon', type: 'text' })
  icon: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
