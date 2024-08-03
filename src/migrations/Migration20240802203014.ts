import { Migration } from '@mikro-orm/migrations';

export class Migration20240802203014 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tab_customers" ("id" serial primary key, "name" varchar(255) not null, "document" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "tab_customers" cascade;');
  }

}
