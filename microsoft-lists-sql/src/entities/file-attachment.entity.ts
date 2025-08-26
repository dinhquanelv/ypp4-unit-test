import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('FileAttachment')
export class FileAttachment {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'NameFile', type: 'text' })
  nameFile: string;

  @Column({ name: 'FileUrl', type: 'text' })
  fileUrl: string;

  @Column({ name: 'Size', type: 'text' })
  size: string;

  @Column({ name: 'FileStatus', type: 'text' })
  fileStatus: string;

  @Column({ name: 'ListRowId', type: 'integer' })
  listRowId: number;

  @Column({ name: 'CreateBy', type: 'integer' })
  createBy: number;

  @CreateDateColumn({ name: 'DeleteAt', type: 'text' })
  deleteAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'text' })
  updatedAt: Date;
}
