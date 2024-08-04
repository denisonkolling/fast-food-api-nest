import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class ProductService {
  constructor(
    private readonly entityManager: EntityManager,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product();
    this.entityManager.assign(product, createProductDto);
    await this.entityManager.persist(product).flush();
    return product;
  }

  findAll() {
    return this.entityManager.findAll(Product);
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.entityManager.findOne(Product, id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<number> {
    const updatedProduct = await this.entityManager.nativeUpdate(Product, { id }, updateProductDto);
    return updatedProduct;
  }

  async remove(id: number) {
    const product = await this.entityManager.findOne(Product, id);

    if (!product) {
      throw new Error('User not found');
    }

    product.isDeleted = true;

    this.updateTimestamp(product);

    await this.entityManager.nativeUpdate(Product, { id }, product);

    return product;
  }

  private updateTimestamp(product: Product): void {
    product.updatedAt = new Date();
  }
}
