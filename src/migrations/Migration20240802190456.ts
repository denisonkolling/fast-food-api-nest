import { Migration } from '@mikro-orm/migrations';

export class Migration20240802190456 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "is_deleted" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "is_deleted";');
  }

}
