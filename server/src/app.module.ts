import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticDbModule } from './elastic-db/elastic-db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ElasticDbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
