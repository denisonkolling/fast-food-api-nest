import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IsNotEmpty, IsNumber, IsPositive, Length } from 'class-validator';

@Entity({ tableName: 'tab_products' })
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  @IsNotEmpty()
  @Length(3, 20)
  category!: string;

  @Property()
  @IsNotEmpty()
  @Length(3, 25)
  name!: string;

  @Property({ type: 'float' })
  @IsNumber()
  @IsPositive()
  price!: number;

  @Property()
  @IsNotEmpty()
  @Length(3, 20)
  description?: string;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt = new Date();

  @Property({ default: false })
  isDeleted: boolean = false;
}
