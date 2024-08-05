import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ProductService } from 'src/product/product.service';
import { CustomerService } from 'src/customer/customer.service';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class OrderService {
  constructor(
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerService.findOne(createOrderDto.customer.id);

    if (!customer) {
      throw new Error(
        `Customer with ID ${createOrderDto.customer.id} not found`,
      );
    }

    const newOrder = new Order();

    newOrder.customer = customer;

    let totalOrderValue = 0;

    for (const item of createOrderDto.items) {
      const product = await this.productService.findOne(item.productNumber);

      if (!product) {
        throw new Error(`Product with ID ${item.productNumber} not found`);
      }

      newOrder.addProduct(product, item.quantity, product.price);

      totalOrderValue += product.price * item.quantity;
    }

    newOrder.total = totalOrderValue;

    await this.entityManager.persistAndFlush(newOrder);
    return newOrder;
  }

  async findAll() {
    const orders = await this.entityManager.findAll(Order);

    return orders;
  }

  async findOne(id: number) {
    const order = await this.entityManager.findOne(Order, id, {populate: ['items'] });

    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
