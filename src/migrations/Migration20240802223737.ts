import { Migration } from '@mikro-orm/migrations';

export class Migration20240802223737 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tab_orders" ("id" serial primary key, "order_date" timestamptz not null, "customer_id" int not null, "total_value" real not null);');

    this.addSql('create table "tab_order_items" ("id" serial primary key, "order_id" int not null, "product_number" int not null, "item_quantity" int not null, "item_value" real not null);');

    this.addSql('alter table "tab_orders" add constraint "tab_orders_customer_id_foreign" foreign key ("customer_id") references "tab_customers" ("id") on update cascade;');

    this.addSql('alter table "tab_order_items" add constraint "tab_order_items_order_id_foreign" foreign key ("order_id") references "tab_orders" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tab_order_items" drop constraint "tab_order_items_order_id_foreign";');

    this.addSql('drop table if exists "tab_orders" cascade;');

    this.addSql('drop table if exists "tab_order_items" cascade;');
  }

}
