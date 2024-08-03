import { Migration } from '@mikro-orm/migrations';

export class Migration20240802201835 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tab_products" add column "created_at" timestamptz null, add column "updated_at" timestamptz null, add column "is_deleted" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tab_products" drop column "created_at", drop column "updated_at", drop column "is_deleted";');
  }

}
