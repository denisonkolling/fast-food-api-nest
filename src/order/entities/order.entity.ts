import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Customer } from '../../customer/entities/customer.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity({ tableName: 'tab_orders' })
export class Order {
  @PrimaryKey()
  id!: number;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @ManyToOne(() => Customer, { eager: true })
  customer!: Customer;

  @Property({ type: 'float' })
  total: number;

  @OneToMany({ entity: () => OrderItem, mappedBy: 'order' })
  items = new Collection<OrderItem>(this);

  constructor(customer: Customer) {
    this.customer = customer;
    this.items = new Collection<OrderItem>(this);
  }

  addProduct(product: Product, quantity: number, price: number) {
    const orderItem = new OrderItem();
    orderItem.product = product;
    orderItem.quantity = quantity;
    orderItem.itemPrice = price;
    this.items.add(orderItem);
  }
}
