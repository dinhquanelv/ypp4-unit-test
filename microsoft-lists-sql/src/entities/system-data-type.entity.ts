import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('SystemDataType')
export class SystemDataType {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'DisplayName', type: 'text' })
  displayName: string;

  @Column({ name: 'DataTypeValue', type: 'text' })
  dataTypeValue: string;

  @Column({ name: 'Icon', type: 'text' })
  icon: string;

  @Column({ name: 'TypeDescription', type: 'text' })
  typeDescription: string;

  @Column({ name: 'CoverImage', type: 'text' })
  coverImage: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
