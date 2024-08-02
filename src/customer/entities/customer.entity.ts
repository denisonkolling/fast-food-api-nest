import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IsNotEmpty, Length } from 'class-validator';

@Entity({ tableName: 'tab_customers' })
export class Customer {
  @PrimaryKey()
  id!: number;

  @Property()
  @IsNotEmpty()
  @Length(6, 20)
  name!: string;

  @Property()
  @IsNotEmpty()
  @Length(11)
  document!: string;
}
