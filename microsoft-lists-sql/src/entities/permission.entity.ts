import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Permission')
export class Permission {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'PermissionCode', type: 'text' })
  permissionCode: string;

  @Column({ name: 'PermissionName', type: 'text' })
  permissionName: string;

  @Column({ name: 'PermissionIcon', type: 'text' })
  permissionIcon?: string;

  @Column({ name: 'PermissionDescription', type: 'text' })
  permissionDescription?: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
