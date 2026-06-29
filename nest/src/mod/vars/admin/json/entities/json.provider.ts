import { DataSource } from 'typeorm';
import { Json } from './json.entity';

export const jsonProviders = [
  {
    provide: 'VAR_JSON_MODULO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Json),
    inject: ['DATA_SOURCE'],
  },
];