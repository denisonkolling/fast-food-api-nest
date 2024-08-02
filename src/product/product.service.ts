import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.insert(product);
    return product;
  }

  findAll() {
    return this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.nativeUpdate({ id }, updateProductDto);
  }

  async remove(id: number) {
    
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new Error('User not found');
    }

    product.isDeleted = true;

    await this.productRepository.nativeUpdate({ id }, product);

    return product;
  }
}
