import { Inject, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('ELASTICSEARCH_CONNECTION') private elasticConn: any) {}

  async getHello() {
    // await this.elasticConn
    //   .index({
    //     index: '123123',
    //     document: {
    //       title: 'gelisims',
    //       year: 1882,
    //     },
    //   })
    //   .then((val) => {
    //     console.log('it worked');
    //     console.log(val);
    //   })
    //   .catch((err) => {
    //     throw new HttpException(
    //       {
    //         status: 'error',
    //         message: 'Unable to reach ElasticSearch cluster: ' + err,
    //       },
    //       500,
    //     );
    //   });
    return 'Hello World!';
  }
}
