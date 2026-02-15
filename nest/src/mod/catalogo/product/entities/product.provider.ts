import { DataSource } from 'typeorm';
import { Producto } from './product.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Producto),
    inject: ['DATA_SOURCE'],
  },
];