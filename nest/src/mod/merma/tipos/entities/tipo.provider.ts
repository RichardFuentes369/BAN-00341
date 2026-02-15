import { DataSource } from 'typeorm';
import { Tipo } from './tipo.entity';

export const tipoProviders = [
  {
    provide: 'TIPOS_MERMA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tipo),
    inject: ['DATA_SOURCE'],
  },
];