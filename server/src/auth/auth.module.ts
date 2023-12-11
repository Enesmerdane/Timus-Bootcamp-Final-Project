import { Module } from '@nestjs/common';
import { ElasticDbModule } from 'src/elastic-db/elastic-db.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [ElasticDbModule],
    controllers: [AuthController],
    providers: [AuthService],
  })
export class AuthModule {}
