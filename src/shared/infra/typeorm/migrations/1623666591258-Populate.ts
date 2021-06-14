import { MigrationInterface, QueryRunner } from 'typeorm';

export class Populate1623666591258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO users (id, name,email,balance,password,is_deleted,created_at,updated_at) VALUES ('08af7fa8-9063-449d-840a-03500c34ed68', 'Leonardo','leo_yoshii@outlook.com',40000,'$2a$08$uiWQajnioIhec85iAtZPh.kZZTZOVL5fsq7bpeKGJMflXacGQn5Qa',false,'2021-06-14 04:53:49.550586','2021-06-14 04:53:49.550586')",
    );

    await queryRunner.query(
      "INSERT INTO users (id, name,email,balance,password,is_deleted,created_at,updated_at) VALUES ('3497e641-bb7b-4a4f-ab59-1c9b1f865b15', 'Leonardo 2','leo_yoshii2@outlook.com',40000,'$2a$08$uiWQajnioIhec85iAtZPh.kZZTZOVL5fsq7bpeKGJMflXacGQn5Qa',false,'2021-06-14 04:53:49.550586','2021-06-14 04:53:49.550586')",
    );

    await queryRunner.query(
      "INSERT INTO transactions (id, sender_id,receiver_id,category_id,description,value,created_at) VALUES ('1aa9cdc3-9c17-4149-ac31-bdfb3f873156', '08af7fa8-9063-449d-840a-03500c34ed68','3497e641-bb7b-4a4f-ab59-1c9b1f865b15',null,'transferencia',1000,'2021-06-14 04:53:49.550586')",
    );

    await queryRunner.query(
      "INSERT INTO transactions (id, sender_id,receiver_id,category_id,description,value,created_at) VALUES ('1aa9cdc3-9c17-4149-ac31-bdfb3f873157', '3497e641-bb7b-4a4f-ab59-1c9b1f865b15','08af7fa8-9063-449d-840a-03500c34ed68',null,'transferencia',1000,'2021-06-14 04:53:49.550586')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
