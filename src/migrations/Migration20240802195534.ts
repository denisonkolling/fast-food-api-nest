import { Migration } from '@mikro-orm/migrations';

export class Migration20240802195534 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tab_products" alter column "price" type real using ("price"::real);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tab_products" alter column "price" type int using ("price"::int);');
  }

}
