import { Migration } from '@mikro-orm/migrations';

export class Migration20240802194229 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tab_products" ("id" serial primary key, "category" varchar(255) not null, "name" varchar(255) not null, "price" int not null, "description" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "tab_products" cascade;');
  }

}
