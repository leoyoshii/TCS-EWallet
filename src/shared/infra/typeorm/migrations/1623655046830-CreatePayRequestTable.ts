import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePayRequestTable1623655046830 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pay_request',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'requester_id',
            type: 'uuid',
          },
          {
            name: 'requested_id',
            type: 'uuid',
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
            name: 'is_deleted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'paid',
            type: 'boolean',
            default: false,
          },
          {
            name: 'transaction_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'payRequestRequesterId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['requester_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'payRequestRequestedId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['requested_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'payRequestTransactionId',
            referencedTableName: 'transactions',
            referencedColumnNames: ['id'],
            columnNames: ['transaction_id'],
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pay_request');
  }
}
