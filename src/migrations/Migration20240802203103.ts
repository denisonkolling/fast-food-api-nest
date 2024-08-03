import { Migration } from '@mikro-orm/migrations';

export class Migration20240802203103 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tab_users" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "username" varchar(255) not null, "document" bigint not null, "email" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "is_deleted" boolean not null default false);');

    this.addSql('drop table if exists "user" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "username" varchar(255) not null, "document" bigint not null, "email" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "is_deleted" boolean not null default false);');

    this.addSql('drop table if exists "tab_users" cascade;');
  }

}
