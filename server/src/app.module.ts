import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticDbModule } from './elastic-db/elastic-db.module';
import { AuthModule } from './auth/auth.module';
import { PostgreDbModule } from './postgre-db/postgre-db.module';
import { FactoryModule } from './factory/factory.module';

@Module({
    imports: [ElasticDbModule, AuthModule, PostgreDbModule, FactoryModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
