import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({ tableName: 'tab_order_items' })
export class OrderItem {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  quantity!: number;

  @Property({ type: 'float' })
  itemPrice: number;
}
