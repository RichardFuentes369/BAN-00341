import { DataSource } from 'typeorm';
import { Var } from './var.entity';

export const varProviders = [
  {
    provide: 'VAR_VAR_MODULO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Var),
    inject: ['DATA_SOURCE'],
  },
];