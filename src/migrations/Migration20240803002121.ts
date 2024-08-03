import { Migration } from '@mikro-orm/migrations';

export class Migration20240803002121 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tab_order_items" add column "product_id" int not null;');
    this.addSql('alter table "tab_order_items" add constraint "tab_order_items_product_id_foreign" foreign key ("product_id") references "tab_products" ("id") on update cascade;');
    this.addSql('alter table "tab_order_items" rename column "item_quantity" to "quantity";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tab_order_items" drop constraint "tab_order_items_product_id_foreign";');

    this.addSql('alter table "tab_order_items" drop column "product_id";');

    this.addSql('alter table "tab_order_items" rename column "quantity" to "item_quantity";');
  }

}
