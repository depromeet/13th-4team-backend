import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from '📚libs/modules/cache/redis/redis.module';
import { OpenAiModule } from '📚libs/modules/open-ai/open-ai.module';
import { AuthModule } from '🔥apps/server/auth/auth.module';
import { ApiModule } from '📚libs/modules/api/api.module';

@Module({
  imports: [JwtModule, RedisCacheModule, OpenAiModule, AuthModule, ApiModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
