import { Migration } from '@mikro-orm/migrations';

export class Migration20240802173423 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "username" varchar(255) not null, "document" bigint not null, "email" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
