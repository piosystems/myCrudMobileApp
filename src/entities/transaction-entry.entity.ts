import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction_entry')
export class TransactionEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: new Date().getDate()})
  txnDay: number;

  @Column({default: new Date().getMonth()})
  txnMonth: number;

  @Column({default: new Date().getFullYear()})
  txnYear: number;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column({default: true})
  expense: boolean
}