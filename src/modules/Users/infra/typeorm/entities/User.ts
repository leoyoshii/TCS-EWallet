import { PayRequest } from '@modules/PayRequest/infra/typeorm/entities/PayRequest';
import { Transaction } from '@modules/Transaction/infra/typeorm/entities/Transaction';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ select: false, type: 'integer' })
  balance: number;

  @Column({ select: false, type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //relations
  @OneToMany(() => Transaction, transaction => transaction.sender)
  sendTransactions: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.receiver)
  receiverTransactions: Transaction[];

  @OneToMany(() => PayRequest, transaction => transaction.requester)
  requesterPayRequests: [];

  @OneToMany(() => PayRequest, transaction => transaction.requested)
  requestedPayRequests: [];
}
