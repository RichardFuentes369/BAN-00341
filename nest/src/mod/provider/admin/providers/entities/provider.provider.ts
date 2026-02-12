import { DataSource } from 'typeorm';
import { Provider } from './providers.entity';

export const providerProviders = [
  {
    provide: 'PROVIDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Provider),
    inject: ['DATA_SOURCE'],
  },
];