import { User } from '@modules/Users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionCategory } from './TransactionCategory';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'sender_id' })
  senderId: string;

  @Column({ type: 'uuid', name: 'receiver_id' })
  receiverId: string;

  @Column({ type: 'integer' })
  value: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'uuid', name: 'category_id', nullable: true })
  categoryId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  //relations
  @ManyToOne(() => User, user => user.sendTransactions)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, user => user.receiverTransactions)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @ManyToOne(() => TransactionCategory, category => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category: TransactionCategory;
}
