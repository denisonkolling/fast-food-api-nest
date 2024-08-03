import { Migration } from '@mikro-orm/migrations';

export class Migration20240803090637 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tab_order_items" add column "quantity" int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tab_order_items" drop column "quantity";');
  }

}
