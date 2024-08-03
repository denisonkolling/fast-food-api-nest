import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { ProductModule } from 'src/product/product.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Order, OrderItem]),
    ProductModule,
    CustomerModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
