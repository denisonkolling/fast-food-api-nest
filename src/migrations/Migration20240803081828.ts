import { Migration } from '@mikro-orm/migrations';

export class Migration20240803081828 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tab_orders" rename column "order_date" to "created_at";');
    this.addSql('alter table "tab_orders" rename column "total_value" to "total";');

    this.addSql('alter table "tab_order_items" rename column "item_value" to "item_price";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tab_orders" rename column "created_at" to "order_date";');
    this.addSql('alter table "tab_orders" rename column "total" to "total_value";');

    this.addSql('alter table "tab_order_items" rename column "item_price" to "item_value";');
  }

}
