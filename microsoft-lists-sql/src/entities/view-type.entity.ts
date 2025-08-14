import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ViewTypeSetting } from './view-type-setting.entity';

@Entity('ViewType')
export class ViewType {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TypeName', type: 'text', length: 50, nullable: false })
  typeName: string;

  @Column({ name: 'DisplayName', type: 'text', length: 100, nullable: false })
  displayName: string;

  @Column({ name: 'HeaderImage', type: 'text', length: 100, nullable: false })
  headerImage: string;

  @Column({ name: 'Icon', type: 'text', length: 100, nullable: false })
  icon: string;

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

  @OneToMany(
    () => ViewTypeSetting,
    (viewTypeSetting) => viewTypeSetting.viewType,
  )
  viewTypeSettings: ViewTypeSetting[];
}
