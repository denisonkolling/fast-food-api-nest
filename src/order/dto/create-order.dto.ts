export class CreateOrderDto {
  customer: { id: number };
  items: { productNumber: number; quantity: number }[];
}
