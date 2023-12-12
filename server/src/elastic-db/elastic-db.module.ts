import { Module } from '@nestjs/common';

import { Client } from '@elastic/elasticsearch';

require('dotenv').config();

const dbProvider = {
  provide: 'ELASTICSEARCH_CONNECTION',
  useValue: new Client({
    node: process.env.ELASTIC_SEARCH_NODE,
    auth: {
      username: process.env.ELASTIC_SEARCH_USERNAME,
      password: process.env.ELASTIC_SEARCH_PASSWORD,
    },
    requestTimeout: 6000,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class ElasticDbModule {}
