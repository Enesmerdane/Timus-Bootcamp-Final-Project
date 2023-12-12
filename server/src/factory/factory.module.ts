import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ElasticDbModule } from 'src/elastic-db/elastic-db.module';
import { FactoryService } from './factory.service';
import { FactoryController } from './factory.controller';
import { PostgreDbModule } from 'src/postgre-db/postgre-db.module';

require('dotenv').config();

@Module({
    imports: [ElasticDbModule, PassportModule, PostgreDbModule],
    controllers: [FactoryController],
    providers: [FactoryService],
})
export class FactoryModule {}
