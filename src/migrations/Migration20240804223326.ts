import { Migration } from '@mikro-orm/migrations';

export class Migration20240804223326 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tab_users" add column "password" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tab_users" drop column "password";');
  }

}
