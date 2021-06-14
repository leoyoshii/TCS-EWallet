import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactionTable1623534922149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sender_id',
            type: 'uuid',
          },
          {
            name: 'receiver_id',
            type: 'uuid',
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'transactionsSenderId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['sender_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'transactionsReceiverId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['receiver_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'transactionsCategoryId',
            referencedTableName: 'transactions_categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
