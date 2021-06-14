import { Transaction } from '@modules/Transaction/infra/typeorm/entities/Transaction';
import { User } from '@modules/Users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pay_request')
export class PayRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'requester_id' })
  requesterId: string;

  @Column({ type: 'uuid', name: 'requested_id' })
  requestedId: string;

  @Column({ type: 'integer' })
  value: number;

  @Column({ type: 'boolean', default: false })
  paid: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'uuid', name: 'transaction_id', nullable: true })
  transactionId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //relations
  @ManyToOne(() => User, user => user.requesterPayRequests)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User, user => user.requestedPayRequests)
  @JoinColumn({ name: 'requested_id' })
  requested: User;

  @OneToOne(() => Transaction)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;
}
