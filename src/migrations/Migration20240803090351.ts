import { Migration } from '@mikro-orm/migrations';

export class Migration20240803090351 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tab_order_items" drop column "product_number", drop column "quantity";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tab_order_items" add column "product_number" int not null, add column "quantity" int not null;');
  }

}
